const { randomUUID } = require("node:crypto");
const sessionModel = require("@/models/session.model");
const usersService = require("@/services/users.service");
// 1. Tạo ra session ID (sid) -> bằng một chuỗi ngẫu nhiên, không trùng lặp
// 2. Gửi phản hồi (server -> client) yêu cầu browser tạo ra cookie sid=xxxx
// 3. Lấy sid từ cookie để xác định client

async function session(req, res, next) {
    let _sid = req.cookies.sid;
    let session = _sid && (await sessionModel.findBySid(req.cookies.sid));

    if (!session) {
        _sid = randomUUID();
        const date = new Date();
        session = await sessionModel.create({ sid: _sid });
        date.setDate(date.getDate() + 1);
        res.set("Set-Cookie", `sid=${_sid}; path=/; httpOnly; expires=${date}`);
    }

    req.session = JSON.parse(session.data ?? null) ?? {};

    // Flash message
    res.setFlash = (data) => {
        req.session.flash = data;
    };

    res.on("finish", () => {
        sessionModel.update(_sid, {
            data: JSON.stringify(req.session),
        });
    });

    next();
}

module.exports = session;
