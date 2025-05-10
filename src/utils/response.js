// 1: Chuẩn hóa định dạng trả về của API
function success(res, status, data, message) {
    // Nếu status là 204 thì không trả về dữ liệu
    if (status === 204) return res.status(status).send();

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
