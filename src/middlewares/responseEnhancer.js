const response = require("@/utils/response");

// 2
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
