const usersService = require("@/services/users.service");

async function shareLocals(req, res, next) {
    res.locals.auth = null;

    const userId = req.session.userId;
    if (userId) {
        res.locals.auth = await usersService.getById(userId);
    }

    next();
}

module.exports = shareLocals;
