const Validator = (schema) => (req, res, next) => {
    const data = {...req.query, ...req.params, ...req.body };
    const { error } = schema.validate(data);
    if (error) {
        res.status(422).send(error.details[0].message);
    } else {
      next();
    }
};

module.exports = {
    Validator
}