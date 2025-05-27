require("module-alias/register");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");

const router = require("@/routes/api");
const adminRouter = require("@/routes/admin");
const notFoundHandler = require("@/middlewares/notFoundHandler");
const errorHandler = require("@/middlewares/errorHandler");
const responseEnhancer = require("@/middlewares/responseEnhancer");
const handlePagination = require("@/middlewares/handlePagination");
const handleSidebar = require("@/middlewares/admin/handleSidebar");
const handleSession = require("@/middlewares/admin/handleSession");

const app = express();

// Middlewares
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

app.use(handlePagination);
app.use(responseEnhancer);

// Set template engine
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.set("layout", "admin/layouts/default");

// Routers
app.use("/api/v1", router);
app.use("/admin", handleSession, handleSidebar, adminRouter);

// Error handler
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(3000, () => {
    console.log("App running on port 3000");
});
