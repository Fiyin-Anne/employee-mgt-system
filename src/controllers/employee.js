const { getProfile, requestUpdate, submitFeedback } = require('../services/employeeServices');
const handler = require('../utils/resService');

class EmployeeController {
    constructor() { }

    getProfile = async (req, res) => {
        //check salary, leave status, holiday list
        console.log(req.user)
        try {
            let profile = await getProfile(data);
            return handler.respS(res, profile);
        } catch (err) {
            return handler.respF(res, null, err.message)
        }
    }

    requestUpdate = async (req, res) => {
        // request profile update
        let data = {};
        data.userId = req.user?.userId;
        data.fields = req.body;
        
        try {
            let newrequest = await requestUpdate(data);
            return handler.respS(res, newrequest);
        } catch (err) {
            return handler.respF(res, null, err.message)
        }
    }

    submitFeedback = async (req, res) => {
        let data = req.body;
        data.userId = req.user?.userId;
        data.email = req.user?.email;
        
        try {
            let newfeedback = await submitFeedback(data);
            return handler.respS(res, newfeedback);
        } catch (err) {
            return handler.respF(res, null, err.message)
        }
    }

}

const Employee = new EmployeeController();
module.exports = Employee;
