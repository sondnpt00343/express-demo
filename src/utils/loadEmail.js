const path = require("path");
const ejs = require("ejs");

async function loadEmail(template, data) {
    const emailPath = path.join(
        __dirname,
        "..",
        "views/emails",
        `${template}.ejs`
    );
    const html = await ejs.renderFile(emailPath, data);
    return html;
}

module.exports = loadEmail;
