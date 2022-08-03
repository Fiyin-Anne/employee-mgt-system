const { register } = require('../services/authServices');
const handler = require('../utils/resService');
const passport = require('passport');


class Auth {
    constructor() {}

    register = async (req, res) => {
        let data = req.body;
        try {
            let newUser = await register(data);
            return handler.respS(res, newUser);
        } catch (err) {
            return handler.respF(res, null, err.message)
        }
    }

    login = async (req, res, next) => {
        passport.authenticate('local', async(err, token, info) => {
            try {
                if(err || !token ) throw new Error(info.message || "Incorrect email or password.");
                const data = {
                    user: info.user,
                    token
                }
                return handler.respS(res, data);
            } catch (err) {
                return handler.respF(res, null, err.message)
            }
        })(req, res, next)
    }

}

const AuthController = new Auth();
module.exports = AuthController;
