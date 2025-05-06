const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

exports.createPost = [
    checkSchema({
        title: {
            notEmpty: true,
            errorMessage: "Title is not empty.",
        },
        description: {
            notEmpty: true,
            errorMessage: "Description is not empty.",
        },
        content: {
            notEmpty: true,
            errorMessage: "Content is not empty.",
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
