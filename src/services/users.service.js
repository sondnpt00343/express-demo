const usersModel = require("@/models/users.model");
const throwError = require("@/utils/throwError");

// Tạo class thế này để đỡ phải export từng function
// các bạn nhé
class UsersService {
    async getUsers() {
        const users = await usersModel.getUsers();
        return users;
    }

    async getUser(id) {
        const user = await usersModel.getUser(id);
        return user;
    }

    async createUser(data) {
        const user = await usersModel.createUser(data);
        return user;
    }

    async updateUser(id, data) {
        const user = await usersModel.updateUser(id, data);
        return user;
    }

    async deleteUser(id) {
        const user = await usersModel.deleteUser(id);
        return user;
    }
}

module.exports = new UsersService();
