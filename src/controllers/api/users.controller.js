const usersService = require("@/services/users.service");
const response = require("@/utils/response");
const throw404 = require("@/utils/throw404");

exports.getList = async (req, res) => {
    const result = await usersService.getAll(req.page, req.limit);
    res.paginate(result);
};

exports.getOne = async (req, res) => {
    const user = await usersService.getById(req.params.id);
    if (!user) throw404();
    res.success(200, user);
};

exports.create = async (req, res) => {
    const user = await usersService.create(req.body);
    response.success(res, 201, user);
};

exports.update = async (req, res) => {
    const existingUser = await usersService.getById(req.params.id);
    if (!existingUser) throw404();

    const user = await usersService.update(req.params.id, req.body);
    response.success(res, 200, user);
};

exports.remove = async (req, res) => {
    const existingUser = await usersService.getById(req.params.id);
    if (!existingUser) throw404();

    await usersService.remove(req.params.id);
    response.success(res, 204);
};
