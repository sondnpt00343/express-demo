require("module-alias/register");
const express = require("express");
const router = require("@/routes");
const notFoundHandler = require("@/middlewares/notFoundHandler");
const errorHandler = require("@/middlewares/errorHandler");
const responseEnhancer = require("@/middlewares/responseEnhancer");
const handlePagination = require("@/middlewares/handlePagination");

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.use(handlePagination);
app.use(responseEnhancer);
app.use("/api/v1", router);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(3000, () => {
    console.log("App running on port 3000");
});
