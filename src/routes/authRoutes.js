const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');
const { Validator } = require('../middlewares/validator');
const AuthSchema = require('../validators/authValidators');

const { registerSchema, loginSchema } = AuthSchema;

router.post('/register', Validator(registerSchema), AuthController.register);
router.post('/login', Validator(loginSchema), AuthController.login);

module.exports = router;
