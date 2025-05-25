const usersService = require("@/services/users.service");

exports.index = async (req, res) => {
    const page = req.query.page ?? 1;
    const { items, total } = await usersService.getAll(page, 20);

    res.render("admin/users/index", {
        users: items,
        total,
    });
};

exports.show = async (req, res) => {
    const user = await usersService.getById(req.params.id);

    res.render("admin/users/show", { user });
};

exports.create = async (req, res) => {
    res.render("admin/users/create", {
        errors: {},
        old: {},
    });
};

exports.store = async (req, res) => {
    const { confirm_password, ...body } = req.body;
    await usersService.create(body);
    res.redirect("/admin/users");
};
