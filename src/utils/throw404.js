const throwError = require("./throwError");

function throw404(message = "Not found") {
    throwError(404, message);
}

module.exports = throw404;
