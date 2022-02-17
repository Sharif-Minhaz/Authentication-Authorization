const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const errorFormatter = require("../utils/validatorFormatter");
const { validationResult, check } = require("express-validator");
const Flash = require("../utils/Flash");

exports.signupGetController = async (req, res, next) => {
	res.render("pages/signup", { title: "Signup", error: {}, values: {}, flashMessage: {} });
};

exports.signupPostController = async (req, res, next) => {
	const { username, email, password } = req.body;
	let errors = validationResult(req).formatWith(errorFormatter);
	if (!errors.isEmpty()) {
		req.flash("fail", "Please check your fields");
		return res.render("pages/signup", {
			error: errors.mapped(),
			title: "Signup",
			values: req.body,
			flashMessage: Flash.getMessage(req),
		});
	}
	try {
		let hashedPassword = await bcrypt.hash(password, 10);

		let saveUser = new User({
			username,
			email,
			password: hashedPassword,
		});

		await saveUser.save();
		req.flash("success", "User created successfully");
		res.redirect("/auth/login");
	} catch (err) {
		next(err);
	}
};

exports.loginGetController = async (req, res, next) => {
	res.render("pages/login", {
		title: "Login",
		error: {},
		value: {},
		flashMessage: Flash.getMessage(req),
	});
};

exports.loginPostController = async (req, res, next) => {
	const { email, password } = req.body;
	const errors = validationResult(req).formatWith(errorFormatter);
	if (!errors.isEmpty()) {
		req.flash("fail", "Please check your fields");
		return res.render("pages/login", {
			title: "Login",
			value: req.body,
			error: errors.mapped(),
			flashMessage: Flash.getMessage(req),
		});
	}
	try {
		let user = await User.findOne({ email });
		if (!user) {
			return res.send("Invalid email");
		}
		let match = await bcrypt.compare(password, user.password);
		if (!match) {
			return res.send("Invalid password");
		}
		req.session.isLoggedIn = true;
		req.session.user = user;
		req.flash("success", "successfully logged in");
		res.redirect("/dashboard");
	} catch (err) {
		next(err);
	}
};

exports.logoutController = (req, res, next) => {
	req.flash("success", "Successfully log out");
	req.session.destroy((err) => {
		if (err) {
			next(err);
		} else {
			res.redirect("/auth/login");
		}
	});
};
