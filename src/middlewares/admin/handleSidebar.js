const sidebarItems = [
    {
        title: "Users",
        icon: "fa-users",
        path: "/users",
    },
    {
        title: "Analytics",
        icon: "fa-chart-bar",
        path: "/analytics",
    },
    {
        title: "Settings",
        icon: "fa-cog",
        path: "/settings",
    },
];

function handleSidebar(req, res, next) {
    res.locals.path = req.path;
    res.locals.sidebarItems = sidebarItems;
    next();
}

module.exports = handleSidebar;
