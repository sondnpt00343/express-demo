require("module-alias/register");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const router = require("@/routes/api");
const adminRouter = require("@/routes/admin");
const notFoundHandler = require("@/middlewares/notFoundHandler");
const errorHandler = require("@/middlewares/errorHandler");
const responseEnhancer = require("@/middlewares/responseEnhancer");
const handlePagination = require("@/middlewares/handlePagination");
const handleSidebar = require("@/middlewares/admin/handleSidebar");

const app = express();

// Middlewares
app.use(express.static("public"));
app.use(express.json()); // Parse fetch/xhr body: content type: application/json
app.use(express.urlencoded()); // Parse content type: application/x-www-form-urlencoded

app.use(handlePagination);
app.use(responseEnhancer);

// 1. Cài đặt (npm i ejs) và cấu hình view engine với ejs

// 2. Tạo 2 pages:
//  - Trang danh sách: /admin/users hoặc /admin/posts
//  - Trang chi tiết: /admin/users/1 hoặc /admin/posts/1
//  - *Lấy dữ liệu danh sách và chi tiết từ DB

// 3. Cú pháp khi dùng ejs
//  - <% Thực thi code JS %>. Ví dụ: <% for (let item of items) { %>
//  - <%- Gọi hàm ejs %>. Ví dụ: <%- include("../partials/header") %>
//  - <%= In giá trị biến %>. Ví dụ: <%= user.name %>
//  - Load view tại controller: res.render("admin/users/index")

// 4. Cấu hình partials cho: head, header, footer cho ít nhất 2 pages
// 5. Tách rõ 2 thư mục "admin" và "api" trong src/controllers và src/routes

// Set template engine
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.set("layout", "admin/layouts/default");

// Routers
app.use("/api/v1", router);
app.use("/admin", handleSidebar, adminRouter);

// Error handler
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(3000, () => {
    console.log("App running on port 3000");
});
