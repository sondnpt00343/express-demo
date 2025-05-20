const usersService = require("@/services/users.service");

exports.index = async (req, res) => {
    const page = req.query.page ?? 1;
    const { items, total } = await usersService.getAll(page, 20);

    res.render("admin/users/index", {
        users: items,
        total
    });
};

exports.show = async (req, res) => {
    const user = await usersService.getById(req.params.id);
    res.render("admin/users/show", { user });
};