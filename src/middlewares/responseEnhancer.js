const response = require("@/utils/response");

function responseEnhancer(req, res, next) {
    res.success = (status, data) => {
        response.success(res, status, data);
    };

    res.error = (status, message) => {
        response.error(res, status, message);
    };

    next();
}

module.exports = responseEnhancer;
