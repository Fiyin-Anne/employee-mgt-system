const db = require('../db/models/index');
const PasswordHash = require('../utils/passwordHash');

const register = async (data) => {

    try {
        const { email, password } = data;

        //check if email exists in user db
        const existingUser = await db.User.findOne({ where: { email } });
        if(existingUser) throw new Error('This user already exists.');
    
        // encrypt password
        const encryptedpassword = await new PasswordHash(password).hashPassword();
        data.password = encryptedpassword;

        const user = await db.User.create(data);
        const { id, name, surname, title, department, status } = user;
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