const db = require('../db/models/index');
const PasswordHash = require('../utils/passwordHash');
const Helpers = require('../utils/helpers/register');


const register = async (data, config={}) => {
    try {
        const user = await Helpers.register(data, config);
        const { id, name, surname, title, email, department, status } = user;
        
        return {
            id,
            name,
            surname,
            email,
            department,
            title,
            status
        };
    } catch (err) {
        let message = err.message || "Unable to add user."
        throw new Error(message)
    }
}

module.exports = {
    register
}