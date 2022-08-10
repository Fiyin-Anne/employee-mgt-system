const passport = require('passport');

const jwtAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (error, user) => {
        if(user) {
            req.user = user;
            return next();
        } else {
            res.status(401).json({
                status: 401,
                message: "Unauthorized access."
            })
        }
    })(req, res, next);

}

module.exports = { jwtAuth }