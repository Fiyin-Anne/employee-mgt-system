const { Strategy, ExtractJwt } = require('passport-jwt');
const db = require('../src/db/models/index');
const passport = require('passport');
const { Strategy: LocalStrategy} = require('passport-local');

const { jwtsign } = require('../src/utils/jwtUtils')

const jwtoptions = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET,
}

const localoptions = {
    usernameField: 'email',
    passwordField: 'password'
}

module.exports = async () => {

    passport.use('jwt', new Strategy(jwtoptions, (user, done) => {

        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }));

    passport.use('local', new LocalStrategy(localoptions, async (email, password, done) => {
        try {
            const user = await db.User.findOne({ where: { email }});

            if(!user) throw new Error("Incorrect email or password");

            // check if deactivated
            if(user.status === 'INACTIVE') throw new Error("Unauthorised.");
            const match = await db.User.matchPassword(password, user.password);
            if(!match) throw new Error("Incorrect email or password");
            const token = jwtsign({userId: user.id, email: user.email, role: user.role, status: user.status});

            const tk = {accesstk: token};
            await user.update(tk);

            const { id, name, surname, title, department, status, role } = user;
            return done(null, token, { user: { id, name, surname, title, department, status, role }});
        } catch (err) {
            return done(null, false, { message: err.message});
        }
    }));
}
