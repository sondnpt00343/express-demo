const { randomUUID } = require("node:crypto");
const sessionModel = require("@/models/session.model");
// 1. Tạo ra session ID (sid) -> bằng một chuỗi ngẫu nhiên, không trùng lặp
// 2. Gửi phản hồi (server -> client) yêu cầu browser tạo ra cookie sid=xxxx
// 3. Lấy sid từ cookie để xác định client

async function handleSession(req, res, next) {
    let _sid = req.cookies.sid;
    let session = _sid && (await sessionModel.findBySid(req.cookies.sid));
    if (!session) {
        _sid = randomUUID();
        const date = new Date();
        session = await sessionModel.create({ sid: _sid });
        date.setDate(date.getDate() + 1);
        res.set("Set-Cookie", `sid=${_sid}; path=/; httpOnly; expires=${date}`);
    }
    const sessionData = JSON.parse(session.data ?? null) ?? {};

    // DB -> sessions sid varchar; data text default null

    req.session = {
        get(key) {
            return sessionData[key] ?? null;
        },
        set(key, value) {
            sessionData[key] = value;
            sessionModel.update(_sid, {
                data: JSON.stringify(sessionData),
            });
        },
    };

    next();
}

module.exports = handleSession;
