const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    res.status(422).json({
        status: "error",
        errors: errors.array().map((error) => ({
            field: error.path,
            message: error.msg,
        })),
    });
};

module.exports = handleValidationErrors;
