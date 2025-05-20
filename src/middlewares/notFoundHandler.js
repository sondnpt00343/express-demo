const response = require("@/utils/response");

function notFoundHandler(req, res) {
    response.error(res, 404, "Resource not found.");
}

module.exports = notFoundHandler;
