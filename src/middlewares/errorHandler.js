const response = require("@/utils/response");

function errorHandler(error, req, res, next) {
    response.error(res, error.status ?? 500, error.toString(), error.errors);
}

module.exports = errorHandler;
