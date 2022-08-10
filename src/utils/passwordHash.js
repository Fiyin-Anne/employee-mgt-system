const bcrypt = require('bcrypt');
const saltRounds = 12;

class PasswordHash {
    constructor(password, passwordHash='') {
        this.password = password;
        this.passwordHash = passwordHash
    }
    
    hashPassword = async () => {
        try {
            return bcrypt.hash(this.password, saltRounds);
        } catch (err) {
            throw new Error(err.message);
        }

    }

    isMatch = async () => {
        try {
            return bcrypt.compare(this.password, this.passwordHash);
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

module.exports = PasswordHash;