const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
    const result = validationResult(req);

    if (result.isEmpty()) return next();

    const errors = result
        .array({
            onlyFirstError: true,
        })
        .reduce((errors, error) => {
            errors[error.path] = error.msg;
            return errors;
        }, {});

    res.render(res.view, {
        errors,
        old: req.body,
    });
};

module.exports = handleValidationErrors;
