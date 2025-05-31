const usersService = require("@/services/users.service");
const userModel = require("@/models/users.model");
const md5 = require("md5");

exports.showRegisterForm = async (req, res) => {
    res.render("admin/auth/register", { layout: "admin/layouts/auth" });
};

exports.register = async (req, res) => {
    await usersService.create({
        email: req.body.email,
        password: md5(req.body.password),
    });
    res.redirect("/admin/login");
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
