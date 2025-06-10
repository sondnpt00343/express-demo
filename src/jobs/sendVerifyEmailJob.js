const transporter = require("@/configs/mailer");
const loadEmail = require("@/utils/loadEmail");
const usersService = require("@/services/users.service");

async function sendVerifyEmailJob(job) {
    const { userId } = JSON.parse(job.payload);
    const user = await usersService.getById(userId);

    // Tạo link xác thực cho userId
    const token = "1234abcd"; // TODO: tạo JWT token
    const data = { token, userId };

    // Load email từ template ejs
    const template = await loadEmail("auth/verification", data);

    console.log(`Bắt đầu gửi email tới: ${user.email}`);

    const info = await transporter.sendMail({
        from: "mailer@fullstack.edu.vn>",
        subject: "Verification email",
        to: user.email,
        html: template,
    });

    // Update thời gian gửi email
    await usersService.update(userId, {
        email_sent_at: new Date(),
    });

    console.log(info);
}

module.exports = sendVerifyEmailJob;
