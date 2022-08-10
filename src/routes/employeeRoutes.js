const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employee');
const { Validator } = require('../middlewares/validator');
const EmployeeSchema = require('../validators/employeeValidators');
const { jwtAuth } = require('../middlewares/auth');

const { updateRequestSchema, employeeFeedbackSchema } = EmployeeSchema;

router.get('/profile',  jwtAuth, EmployeeController.getProfile);
router.post('/feedback',  jwtAuth, Validator(employeeFeedbackSchema), EmployeeController.submitFeedback);
router.post('/request-update',  jwtAuth, Validator(updateRequestSchema), EmployeeController.requestUpdate);

module.exports = router;
