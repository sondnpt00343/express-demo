const response = require("@/utils/response");

// 2: Hàm xử lý khi không có method & path khớp với app
function notFoundHandler(req, res) {
    response.error(res, 404, "Resource not found.");
}

module.exports = notFoundHandler;
