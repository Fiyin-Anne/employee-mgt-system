const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().trim().min(2).required(),
    surname: Joi.string().trim().min(2).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(5).required(),
    role: Joi.string().default('ADMIN'),
    title: Joi.string().trim().required(),
    departmentId: Joi.number().required(),
    salary: Joi.object({
        monthly: Joi.number().required()
    }).required(),
    status: Joi.string().trim().valid('ACTIVE', 'AWAY', 'INACTIVE').default('ACTIVE'),
});

const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required()
});

module.exports = {
    registerSchema,
    loginSchema
}