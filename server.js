require("module-alias/register");
const express = require("express");
const router = require("@/routes");
const notFoundHandler = require("@/middlewares/notFoundHandler");
const errorHandler = require("@/middlewares/errorHandler");
const responseEnhancer = require("@/middlewares/responseEnhancer");
const handlePagination = require("@/middlewares/handlePagination");

// 1. Mệnh đề where, toán tử: =, !=, <>, >, >=, <, <=, AND, OR, IN, NOT IN, IS NULL, IS NOT NULL, BETWEEN, LIKE
// 2. Sắp xếp, giới hạn: ORDER, LIMIT, OFFSET
// 3. Thực hành xây dựng chức năng phân trang
// 4. 1-1, n-n

const app = express();

app.use(express.static("public"));
app.use(express.json());

// 3
app.use(handlePagination);
app.use(responseEnhancer);
app.use("/api/v1", router);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(3000, () => {
    console.log("App running on port 3000");
});
