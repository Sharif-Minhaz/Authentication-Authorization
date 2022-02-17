exports.isAuthenticated = (req, res, next) => {
	if (!req.session.isLoggedIn) {
		return res.redirect("/auth/login");
	}
	next();
};

exports.isUnAuthenticated = (req, res, next) => {
	if (req.session.isLoggedIn) {
		return res.redirect("/dashboard");
	}
	next();
};
