const { validationResult } = require("express-validator");
const response = require("@/utils/response");

const handleValidationErrors = (req, res, next) => {
    const result = validationResult(req);

    if (result.isEmpty()) return next();

    const errors = result.array().map((error) => ({
        field: error.path,
        message: error.msg,
    }));

    response.error(res, 422, "Unprocessable entity.", errors);
};

module.exports = handleValidationErrors;
