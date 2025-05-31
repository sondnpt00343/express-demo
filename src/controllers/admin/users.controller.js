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

exports.edit = async (req, res) => {
    const user = await usersService.getById(req.params.id);
    console.log(user);

    res.render("admin/users/edit", {
        errors: {},
        old: user,
    });
};

exports.update = async (req, res) => {
    const { confirm_password, ...body } = req.body;
    await usersService.update(req.params.id, body);
    res.redirect(`/admin/users/${req.params.id}/edit`);
};

exports.store = async (req, res) => {
    const { confirm_password, ...body } = req.body;
    await usersService.create(body);

    res.setFlash({
        type: "success",
        message: "Tạo người dùng thành công",
    });
    res.redirect("/admin/users");
};
