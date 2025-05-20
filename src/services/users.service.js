const usersModel = require("@/models/users.model");

class UsersService {
    async getAll(page, limit) {
        const items = await usersModel.findAll(page, limit);
        const total = await usersModel.count();
        return { items, total };
    }

    async getById(id) {
        const user = await usersModel.findById(id);
        return user;
    }

    async create(data) {
        const user = await usersModel.create(data);
        return user;
    }

    async update(id, data) {
        const user = await usersModel.update(id, data);
        return user;
    }

    async remove(id) {
        const user = await usersModel.remove(id);
        return user;
    }
}

module.exports = new UsersService();
