const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
        user: "mailer@fullstack.edu.vn",
        pass: "jvea zmhn nmth tcvu",
    },
});

module.exports = transporter;
