function throwError(status, message, errors) {
    const error = new Error(message);
    error.status = status;
    error.errors = errors;
    throw error;
}

module.exports = throwError;
