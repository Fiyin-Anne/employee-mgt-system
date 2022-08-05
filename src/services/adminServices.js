const db = require('../db/models/index');
const { register } = require('./authServices')

const addNewEmployee = (data) => {

    try {
        let config = {};
        config.registerEmployee = true;
        return register(data, config);
    } catch(err) {
        throw new Error(err.message)
    }
}

const listEmployees = async (data) => {

    try {
        const {page, limit} = data;
        let offset = limit * (page - 1);
        delete data.page;
        delete data.limit;

        const attributes = ['id', 'name', 'surname', 'title', 'departmentId', 'role' , 'status'];

        const employees = await db.User.findAndCountAll({ where: data, attributes, limit, offset});

        return {
            page,
            total: employees.count,
            rows: employees.rows
        };
    } catch (error) {
        throw new Error(error.message)
    }
}

const viewEmployeeDetails = async (data) => {

    try {

        const attributes = ['id', 'name', 'surname', 'title', 'departmentId', 'role', 'status', 'createdAt'];

        const employee = await db.User.findByPk(data.employee, {
            attributes,
            include: [
                {
                model: db.Salary,
                attributes: ['monthly', 'yearly']
            }],
        });
 
        if(!employee) throw new Error("Employee not found.");
        
        return employee;
    } catch (error) {
        throw new Error(error.message);
    }
}

const deactivateEmployee = async (data) => {
    try {
        const { email } = data;

        const existingUser = await db.User.findOne({ where: { email } });
        if(!existingUser) throw new Error('User not found.');

        const status = "INACTIVE";
        if(existingUser.status === status ) {
            throw new Error("User is inactive.");
        }

        const update = { status };
        await existingUser.update(update);

        return existingUser;
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateEmployeeDetails = async (data) => {
    try {
        const { employee } = data;
        delete data.employee;

        const existingUser = await db.User.findOne({ where: { id: employee }});
        if(!existingUser) throw new Error('User not found.');

        if(existingUser.status === "INACTIVE" ) {
            throw new Error("User is inactive.");
        }

        await existingUser.update(data);
        const {id, name, surname, title, department, type, status, updatedAt } = existingUser;
        return  {id, name, surname, title, department, type, status, updatedAt };
    } catch (error) {
        throw new Error(error.message);
    }
}

const generateEmployeeReport = async (data) => {
    //return profile, payslip, number of leaves taken, requests
    try {
        const { employee } = data;
        delete data.employee;

        const report = await db.User.findByPk(employee, { 
            include: [
                {
                    model: db.Request,
                    attributes: ['meta', 'status'],
                    raw: true
                },
                {
                    model: db.Timeoff,
                    attributes: ['type', 'duration', 'status', 'end_date'],
                    raw: true
                },
                {
                    model: db.Salary,
                    attributes: ['monthly', 'yearly'],
                    raw: true
                }
            ]
        
        });
        
        if(!report) throw new Error('User not found.');

        // return salary info, timeoff info
        const {id, name, surname, title, department, type, status, updatedAt } = report;
        let response = {
            Profile: {
                id, 
                name, 
                surname,
                title, 
                department, 
                type, 
                status,
                updatedAt
            },
            PaySlip: report.toJSON().Salary,
            Update_Requests: report.toJSON().Requests,
            Timeoff: report.toJSON().Timeoffs
        };
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    addNewEmployee, listEmployees, viewEmployeeDetails, deactivateEmployee, updateEmployeeDetails, generateEmployeeReport
}