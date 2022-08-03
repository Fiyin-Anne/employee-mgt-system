const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().trim().min(2).required(),
    surname: Joi.string().trim().min(2).required(),
    email: Joi.string().email().lowercase().required(),
    department: Joi.number().required(),
    title: Joi.string().trim().required(),
    type: Joi.string().default('ADMIN'),
    status: Joi.string().trim().valid('ACTIVE', 'AWAY', 'INACTIVE'),
    password: Joi.string().min(5).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required()
});

const newEmployeeSchema = Joi.object({
    name: Joi.string().trim().required(),
    department: Joi.string().trim().required(),
    title: Joi.string().trim().required(),
    type: Joi.string().default('USER'),
    email: Joi.string().email().lowercase().required()
});

const deactivateEmployeeSchema = Joi.object({
    email: Joi.string().email().lowercase().required()
});

const viewEmployeeSchema = Joi.object({
    id: Joi.number().required()
});

const listEmployeesSchema = Joi.object({
    email: Joi.number().required(),
    department: Joi.string().trim(),
    role: Joi.string().trim(),
    level: Joi.number(),
});

const updateEmployeeSchema = Joi.object({
    email: Joi.number().required(),
    name: Joi.string().trim(),
    department: Joi.string().trim(),
    role: Joi.string().trim(),
    level: Joi.number(),
})

module.exports = {
    registerSchema,
    loginSchema,
    newEmployeeSchema,
    deactivateEmployeeSchema,
    viewEmployeeSchema,
    listEmployeesSchema,
    updateEmployeeSchema
};