const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "mailer@fullstack.edu.vn",
        pass: "nrdr umam rhtu qipu",
        // pass: process.env.GOOGLE_APP_PASSWORD,
    },
});

module.exports = transporter;
