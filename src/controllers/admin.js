// create class adminController
const { addNewEmployee, listEmployees, viewEmployeeDetails, deactivateEmployee, updateEmployeeDetails } = require('../services/adminServices');
const handler = require('../utils/resService');

class AdminController {
    constructor() { }

    addNewEmployee = async (req, res) => {
        let data = req.body;
        try {
            let newUser = await addNewEmployee(data);
            return handler.respS(res, newUser);
        } catch (err) {
            return handler.respF(res, null, err.message)
        }
    }

    listEmployees = async(req, res) => {
        let { body } = req;

        try {
            let employees = await listEmployees(body);
            return handler.respS(res, employees);
        } catch (err) {
            return handler.respF(res, null, err.message)
        }
    }

    viewEmployeeDetails = async (req, res) => {
        let { body } = req;

        try {
            let employee = await viewEmployeeDetails(body);
            return handler.respS(res, employee);
        } catch (err) {
            return handler.respF(res, null, err.message)
        }
    }

    updateEmployeeDetails = async (req, res) => {
        let { body } = req;

        try {
            let result = await updateEmployeeDetails(body);
            return handler.respS(res, result);
        } catch (err) {
            return handler.respF(res, null, err.message)
        }
    }

    deactivateEmployee = async (req, res) => {
       let { body } = req;

        try {
            let result = await deactivateEmployee(body);
            return handler.respS(res, result);
        } catch (err) {
            return handler.respF(res, null, err.message)
        }
    }
}

const Admin = new AdminController()
module.exports = Admin;
