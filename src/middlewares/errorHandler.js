const response = require("@/utils/response");

// 4: Hàm xử lý khi app có lỗi (throw hoặc next(error))
function errorHandler(error, req, res, next) {
    response.error(res, error.status ?? 500, error.toString(), error.errors);
}

module.exports = errorHandler;
