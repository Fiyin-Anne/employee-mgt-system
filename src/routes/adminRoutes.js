const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin');
const { Validator } = require('../middlewares/validator');
const AdminSchema = require('../validators/adminValidators');

const { registerSchema, loginSchema, newEmployeeSchema, updateEmployeeSchema, viewEmployeeSchema, listEmployeesSchema, deactivateEmployeeSchema} = AdminSchema;
const { register, adminLogin, addNewEmployee, listEmployees, viewEmployeeDetails, deactivateEmployee, updateEmployeeDetails } = AdminController;

router.get('/register', Validator(registerSchema), register);
router.post('/login', Validator(loginSchema), adminLogin);
router.post('/new-employee', Validator(newEmployeeSchema), addNewEmployee);
router.post('/deactivate-employee', Validator(deactivateEmployeeSchema), deactivateEmployee);
router.put('/update-employee', Validator(updateEmployeeSchema), updateEmployeeDetails);
router.get('/employees', Validator(listEmployeesSchema), listEmployees);
router.get('/:employee', Validator(viewEmployeeSchema), viewEmployeeDetails)

module.exports = router;
