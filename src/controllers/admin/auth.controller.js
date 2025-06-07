const usersService = require("@/services/users.service");
const userModel = require("@/models/users.model");
const md5 = require("md5");
const { createToken, verifyToken } = require("@/utils/jwt");
const transporter = require("@/configs/mailer");

exports.showRegisterForm = async (req, res) => {
    res.render("admin/auth/register", { layout: "admin/layouts/auth" });
};

// Luồng đăng ký và xác thực

// 1. Đăng ký tài khoản, thêm trường verified_at (mặc định null). *Đăng ký thành công: "Vui lòng kiểm tra email và xác thực tài khoản trước."
// 2. Tạo token ứng với tài khoản đó (VD: gắn userId), có thời hạn (VD: 12 giờ)
// 3. Gửi email kèm link xác thực (method GET) kèm param token
// 4. Xác thực nếu token hợp lệ -> điền verified_at = thời gian hiện tại

// Logic: Khi user đăng nhập, check verified_at nếu null không cho đăng nhập
// => Báo flash message: "Vui lòng xác thực tài khoản trước."

exports.register = async (req, res) => {
    const user = await usersService.create({
        email: req.body.email,
        password: md5(req.body.password),
    });

    // Tạo token
    const token = createToken(
        { userId: user.id }, // Đính userId vào token
        {
            expiresIn: 60 * 60 * 12, // Thời hạn 12 hours
        }
    );

    // Tạo link xác minh email (để gửi kèm email xác minh)
    const verifyUrl = `${req.protocol}://${req.host}/admin/verify-email?token=${token}`;

    await transporter.sendMail({
        from: "mailer@fullstack.edu.vn",
        to: user.email, // Gửi cho đúng tài khoản vừa đăng ký
        html: `
            <div>
                <p>
                    Nhấn vào đây để xác thực:
                </p>
                <p>
                    <a href="${verifyUrl}">Xác minh tài khoản</a>
                </p>
            </div>
        `,
    });

    res.setFlash({
        type: "success",
        message: `Chúng tôi đã gửi một email xác thực tới ${user.email}. Hãy kiểm tra inbox và xác minh để tiếp tục.`,
    });

    res.redirect("/admin/login");
};

exports.verifyEmail = async (req, res) => {
    // Nhận token từ query parameter
    const token = req.query.token;

    // Xác thực token hợp lệ
    const verify = verifyToken(token);

    // Xác thực thành công
    if (verify.success) {
        // Lất userId từ token
        const userId = verify.data.userId;

        // Lấy user từ DB
        const user = await usersService.getById(userId);

        // Nếu verify rồi thì chuyển qua login kèm message lỗi
        if (user.verified_at) {
            res.setFlash({
                type: "info",
                message: "Liên kết xác minh đã hết hạn hoặc không hợp lệ.",
            });
            return res.redirect("/admin/login");
        }

        // Cập nhật verified_at vào user với thời gian hiện tại (thời gian user click vào link xác thực trong email)
        await usersService.update(userId, {
            verified_at: new Date(),
        });
        res.send("Verify success");
        return;
    }
    res.send("Verify fail");
};

exports.showLoginForm = async (req, res) => {
    res.render("admin/auth/login", { layout: "admin/layouts/auth" });
};

exports.login = async (req, res) => {
    const email = req.body.email;
    const password = md5(req.body.password);

    const user = await userModel.findByEmailAndPassword(email, password);
    if (user) {
        req.session.userId = user.id;
        return res.redirect("/admin/dashboard");
    }

    // render login form & show errors
};

exports.logout = async (req, res) => {
    delete req.session.userId;
    res.redirect("/admin/login");
};
