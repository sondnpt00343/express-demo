const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

exports.createUser = [
    (req, res, next) => {
        res.view = "admin/users/create";
        next();
    },
    checkSchema({
        name: {
            notEmpty: true,
            errorMessage: "Name is not empty.",
        },
        email: {
            notEmpty: {
                errorMessage: "Description is not empty.",
            },
            isEmail: {
                errorMessage: "Must be an email.",
            },
        },
        phone: {
            notEmpty: true,
            errorMessage: "Phone is not empty.",
        },
    }),
    handleValidationErrors,
];

exports.updatePost = [
    checkSchema({
        title: {
            optional: true,
            notEmpty: true,
            errorMessage: "Title is not empty.",
        },
        description: {
            optional: true,
            notEmpty: true,
            errorMessage: "Description is not empty.",
        },
        content: {
            optional: true,
            notEmpty: true,
            errorMessage: "Content is not empty.",
        },
    }),
    handleValidationErrors,
];
