const Joi = require('joi');

const newEmployeeSchema = Joi.object({
    salary: Joi.object({
        monthly: Joi.number().required()
    }).required(),
    surname: Joi.string().trim().min(2).required(),
    name: Joi.string().trim().required(),
    title: Joi.string().trim().required(),
    status: Joi.string().trim().valid('ACTIVE', 'AWAY', 'INACTIVE').default('ACTIVE'),
    role: Joi.string().default('USER'),
    departmentId: Joi.number().required(),
    password: Joi.string().default('employee'), // employee required to change this within 2 days of being added.
    email: Joi.string().email().lowercase().required()
});

const deactivateEmployeeSchema = Joi.object({
    email: Joi.string().email().lowercase().required()
});

const viewEmployeeSchema = Joi.object({
    employee: Joi.number().required()
});

const listEmployeesSchema = Joi.object({
    email: Joi.string().email().lowercase(),
    page: Joi.number().default(1),
    limit: Joi.number().default(30),
    departmentId: Joi.number(),
    role: Joi.string().trim()
});

const updateEmployeeSchema = Joi.object({
    employee: Joi.number().required(),
    email: Joi.string().email(),
    name: Joi.string().trim(),
    surname: Joi.string().trim(),
    departmentId: Joi.number(),
    role: Joi.string().trim(),
    title: Joi.string().trim(),
})

module.exports = {
    newEmployeeSchema,
    deactivateEmployeeSchema,
    viewEmployeeSchema,
    listEmployeesSchema,
    updateEmployeeSchema
};