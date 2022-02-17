const authRoute = require("../routers/auth.route");
const homeRoute = require("../routers/home.route");
const dashboardRoute = require("../routers/dashboard.route");

const routes = [
	{
		path: "/auth",
		handler: authRoute,
	},
	{
		path: "/dashboard",
		handler: dashboardRoute,
	},
	{
		path: "/",
		handler: homeRoute,
	},
];

module.exports = (app) => {
	routes.forEach((r) => {
		r.path === "/" ? app.get(r.path, r.handler) : app.use(r.path, r.handler);
	});
};

