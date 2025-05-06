exports.getCurrentUser = (req, res) => {
    res.send("me");
};

exports.register = (req, res) => {
    res.send("register");
};

exports.login = (req, res) => {
    res.send("login");
};

exports.refreshToken = (req, res) => {
    res.send("refresh-token");
};
