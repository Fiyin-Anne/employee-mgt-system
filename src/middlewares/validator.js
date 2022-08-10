const Validator = (schema) => (req, res, next) => {
    const data = {...req.query, ...req.params, ...req.body };
    const { error, value } = schema.validate(data);
    if (error) {
        res.status(422)
        .json({
            status: "error",
            message: error.details[0].message
        })
    } else {
        req.body = value;
        next();
    }
};

module.exports = {
    Validator
}