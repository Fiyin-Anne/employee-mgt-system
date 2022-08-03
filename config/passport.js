const { Strategy, ExtractJwt } = require('passport-jwt');
const db = require('../src/db/models/index');
const passport = require('passport');
const { Strategy: LocalStrategy} = require('passport-local');

const { jwtsign, jwtverify } = require('../src/utils/jwtUtils')

const jwtoptions = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET,
    issuer : process.env.JWT_ISSUER,
    audience : process.env.JWT_AUDIENCE,
}

const localoptions = {
    usernameField: 'email',
    passwordField: 'password'
}

module.exports = async () => {
    passport.use('jwt', new Strategy(jwtoptions, async (jwt_payload, done) => {
        try {
            const user = await db.User.findByPk(jwt_payload.userId, {raw: true});
            if(!user) throw new Error("User not found.");
    
            return done(null, user, jwt_payload);
        } catch (err) {
            return done(err, false);
        }
    }));
    
    passport.use('local', new LocalStrategy(localoptions, async (email, password, done) => {
        try {
            const user = await db.User.findOne({ where: { email }, raw: true});

            if(!user) throw new Error("Incorrect email or password");
            const match = await db.User.matchPassword(password, user.password);
            if(!match) throw new Error("Incorrect email or password");
            const token = jwtsign({userId: user.id, email: user.email});
            const { id, name, surname, title, department, status } = user;

            let userData = {
                id, name, surname, title, department, status

            }
            return done(null, token, { user: { id, name, surname, title, department, status }});
        } catch (err) {
            return done(null, false, { message: err.message});
        }
    }));
}
