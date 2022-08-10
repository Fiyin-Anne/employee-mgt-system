const express = require('express');
const router = express.Router();
const Admin = require('../controllers/admin');
const { Validator } = require('../middlewares/validator');
const AdminSchema = require('../validators/adminValidators');
const { jwtAuth } = require('../middlewares/auth');
const { checkAdmin } = require('../middlewares/checkAdmin');

const { newEmployeeSchema, updateEmployeeSchema, viewEmployeeSchema, listEmployeesSchema, deactivateEmployeeSchema, employeeReportSchema} = AdminSchema;

router.post('/employees/add', jwtAuth, checkAdmin, Validator(newEmployeeSchema), Admin.addNewEmployee);
router.post('/employees/deactivate',  jwtAuth, checkAdmin, Validator(deactivateEmployeeSchema), Admin.deactivateEmployee);
router.get('/employees', jwtAuth, checkAdmin, Validator(listEmployeesSchema), Admin.listEmployees);
router.get('/employees/:employee',  jwtAuth, checkAdmin, Validator(viewEmployeeSchema), Admin.viewEmployeeDetails);
router.put('/employees/:employee',  jwtAuth, checkAdmin, Validator(updateEmployeeSchema), Admin.updateEmployeeDetails);
router.get('/employees/:employee/report',  jwtAuth, checkAdmin, Validator(employeeReportSchema), Admin.generateReport);

module.exports = router;
