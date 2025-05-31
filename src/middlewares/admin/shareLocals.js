const usersService = require("@/services/users.service");

async function shareLocals(req, res, next) {
    res.locals.auth = null;

    // Auth user
    const userId = req.session.userId;
    if (userId) {
        res.locals.auth = await usersService.getById(userId);
    }

    // Flash message
    res.locals.flash = req.session.flash;
    delete req.session.flash;

    next();
}

module.exports = shareLocals;
