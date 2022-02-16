const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const errorFormatter = require("../utils/validatorFormatter");
const { validationResult } = require("express-validator");

exports.signupGetController = async (req, res, next) => {
	res.render("pages/signup", { title: "Signup", error:{}, values:{} });
};

exports.signupPostController = async (req, res, next) => {
	const { username, email, password } = req.body;
	let errors = validationResult(req).formatWith(errorFormatter);
	if (errors) {
		console.log(errors.mapped());
		return res.render("pages/signup", {
			error: errors.mapped(),
			title: "Signup",
			values: req.body,
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
		res.redirect("/auth/login");
	} catch (err) {
		next(err);
	}
};

exports.loginGetController = async (req, res, next) => {
	const { email, password } = req.body;
	res.render("pages/login", { title: "Login" });
};

exports.loginPostController = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (!user) {
			return res.send("Invalid email");
		}
		let match = await bcrypt.compare(password, user.password);
		if (!match) {
			return res.send("Invalid password");
		}
		res.send(`Welcome to the mid web: ${user.username}`);
	} catch (err) {
		next(err);
	}
};
