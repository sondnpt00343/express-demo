// 1: Chuẩn hóa định dạng trả về của API
function success(res, status, data, message) {
    res.status(status).json({
        success: true,
        data,
        message,
    });
}

function error(res, status, message, errors) {
    res.status(status).json({
        success: false,
        message,
        errors,
    });
}

module.exports = {
    success,
    error,
};
