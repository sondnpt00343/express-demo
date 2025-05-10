const usersService = require("@/services/users.service");
const response = require("@/utils/response");
const throw404 = require("@/utils/throw404");

exports.getUsers = async (req, res) => {
    const users = await usersService.getUsers();
    response.success(res, 200, users);
};

exports.getUser = async (req, res) => {
    const user = await usersService.getUser(req.params.id);
    if (!user) throw404();
    response.success(res, 200, user);
};

exports.createUser = async (req, res) => {
    const user = await usersService.createUser(req.body);
    response.success(res, 201, user);
};

exports.updateUser = async (req, res) => {
    const existingUser = await usersService.getUser(req.params.id);
    if (!existingUser) throw404();

    const user = await usersService.updateUser(req.params.id, req.body);
    response.success(res, 200, user);
};

exports.deleteUser = async (req, res) => {
    const existingUser = await usersService.getUser(req.params.id);
    if (!existingUser) throw404();

    await usersService.deleteUser(req.params.id);
    response.success(res, 204);
};
