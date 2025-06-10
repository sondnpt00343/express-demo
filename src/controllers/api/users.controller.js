const path = require("path");

const usersService = require("@/services/users.service");
const response = require("@/utils/response");
const throw404 = require("@/utils/throw404");
const queue = require("@/utils/queue");

// Bài tập trên lớp:
// 1. Tạo utils/loadEmail
// 2. Gửi email "html" load template thông qua utils/loadEmail
// 3. Có sử dụng ít nhất 1 biến truyền từ ngoài vào.
// VD: loadEmail("auth/verification", { verificationLink: "URL-của-bạn" })

exports.getEmailImage = async (req, res) => {
    const userId = req.params.id;
    await usersService.update(userId, {
        email_seen_at: new Date(),
    });

    const imgPath = path.join(__dirname, "../../../", `public/img/logo.png`);
    res.sendFile(imgPath);
};

exports.getList = async (req, res) => {
    const userId = 304; // Fake
    queue.dispatch("sendVerifyEmailJob", { userId });

    const result = await usersService.getAll(req.page, req.limit);
    res.paginate(result);
};

exports.getOne = async (req, res) => {
    const user = await usersService.getById(req.params.id);
    if (!user) throw404();
    res.success(200, user);
};

exports.create = async (req, res) => {
    const user = await usersService.create(req.body);
    response.success(res, 201, user);
};

exports.update = async (req, res) => {
    const existingUser = await usersService.getById(req.params.id);
    if (!existingUser) throw404();

    const user = await usersService.update(req.params.id, req.body);
    response.success(res, 200, user);
};

exports.remove = async (req, res) => {
    const existingUser = await usersService.getById(req.params.id);
    if (!existingUser) throw404();

    await usersService.remove(req.params.id);
    response.success(res, 204);
};
