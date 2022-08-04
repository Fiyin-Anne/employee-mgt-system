const jwt = require('jsonwebtoken');

const jwtsign = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { algorithm: process.env.JWT_ALGORITHM, expiresIn: '24h' })
};

const jwtverify = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, { algorithm: process.env.JWT_ALGORITHM } )
};

module.exports = { jwtsign, jwtverify}