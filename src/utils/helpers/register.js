const db = require('../../db/models/index');
const PasswordHash = require('../../utils/passwordHash');

class Helper{
    constructor(){}

    register = async (data, config={}) => {
        try {

            const { email, password } = data;
    
            let salary = data.salary;
            delete data.salary;

            //check if email exists in user db
            const existingUser = await db.User.findOne({ where: { email } });
            if(existingUser) throw new Error('This user already exists.');
    
            const encryptedpassword = await new PasswordHash(password).hashPassword();
            data.password = encryptedpassword;
    
            const user = await db.User.create(data);
            
            salary.userId = user.id;
            salary.yearly = Number(salary.monthly) * 12;
            await db.Salary.create(salary);

            return user;

    
        } catch (err) {
            throw new Error(err.message)
        }
    }
    

}

const Helpers = new Helper();
module.exports = Helpers;