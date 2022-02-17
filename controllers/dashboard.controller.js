const Flash = require("../utils/Flash");

exports.dashboardGetController = (req, res, next) => {
	res.render("pages/dashboard", {
		title: "dashboard",
		errors: {},
		flashMessage: Flash.getMessage(req),
	});
};
