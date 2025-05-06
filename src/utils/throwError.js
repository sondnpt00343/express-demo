// 6: Hàm throw lỗi => errorHandler() sẽ xử lý
function throwError(status, message, errors) {
    const error = new Error(message);
    error.status = status;
    error.errors = errors;
    throw error;
}

module.exports = throwError;

// BÀi TẬP: TÌM VỪA SỬA NHỮNG CHỖ RES LỖI
// => Thay thế bằng throwError()
