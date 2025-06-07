const jwt = require("jsonwebtoken");

// Mã bí mật để tạo và xác thực JWT token (Tạo vào .env các bạn nhé)
const MAIL_JWT_SECRET =
    "169ba94e172b00288104ffc9147f82a9a2738a44e91abc460f5b5e8a1e475d3c72192a9566e8dc248befca474328eb30916e468c3bd5026856633b375eb295cf";

// Hàm tạo token kèm payload (dữ liệu token) và options (có thể kèm thời hạn)
// https://www.npmjs.com/package/jsonwebtoken#token-expiration-exp-claim
exports.createToken = function (payload, options) {
    const token = jwt.sign(payload, MAIL_JWT_SECRET, options);
    return token;
};

// Hàm xác thực token
// Trả về: {success: boolean, data: if success, message: if error}
exports.verifyToken = function (token) {
    try {
        const decoded = jwt.verify(token, MAIL_JWT_SECRET);
        return {
            success: true,
            data: decoded,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};
