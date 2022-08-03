// create class adminController
const { register, login } = require('../services/adminServices');
const handler = require('../utils/resService');

class Admin {
    constructor() { 
        
    }

    addNewEmployee = async (req, res) => {
        let data = req.body;

        // let newAdmin = await 
    }

    deactivateEmployee = (req, res) => {
        let data = req.body;

        // let newAdmin = await 
    }

    listEmployees = (req, res) => {
        let data = req.body;

        // let newAdmin = await 
    }

    viewEmployeeDetails = (req, res) => {
        let data = req.body;

        // let newAdmin = await 
    }

    updateEmployeeDetails = (req, res) => {
        let data = req.body;

        // let newAdmin = await 
    }
    deactivateEmployee = (req, res) => {
        let data = req.body;

        // let newAdmin = await 
    }
}

const AdminController = new Admin()
module.exports = AdminController;
