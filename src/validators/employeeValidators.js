const Joi = require('joi');

const employeeFeedbackSchema = Joi.object({
    anonymous: Joi.boolean().valid(true, false).required(),
    feedback: Joi.string().min(5).max(1500).trim().required(),
    type: Joi.string().valid('Suggestion', 'Complaint').required()
})

const updateRequestSchema = Joi.object({
    name: Joi.boolean().valid(true, false),
    surname: Joi.string().min(2).trim(),
    home_address: Joi.string().min(2).trim(),
    role: Joi.string().trim(),
    title: Joi.string().trim(),
})

module.exports = {
    employeeFeedbackSchema,
    updateRequestSchema
};