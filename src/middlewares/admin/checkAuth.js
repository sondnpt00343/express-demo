function checkAuth(req, res, next) {
    // Bổ sung /verify-email
    const isAuthRequired = !["/register", "/login", "/verify-email"].includes(
        req.path
    );

    if (!res.locals.auth && isAuthRequired) {
        return res.redirect("/admin/login");
    }

    // Thêm block if này để kiểm tra:
    // 1. Nếu user đã đăng nhập, và:
    // 2. Nếu user chưa xác minh email, và:
    // 3. Nếu user truy cập vào một trang cần xác thực mới được phép vào
    if (res.locals.auth && !res.locals.auth.verified_at && isAuthRequired) {
        // Chuyển qua /admin/login kèm báo lỗi
        res.setFlash({
            type: "error",
            message: "Vui lòng xác minh địa chỉ email trước.",
        });
        return res.redirect("/admin/login");
    }

    if (res.locals.auth && !isAuthRequired && res.locals.auth.verified_at) {
        return res.redirect("/admin/dashboard");
    }

    next();
}

module.exports = checkAuth;
