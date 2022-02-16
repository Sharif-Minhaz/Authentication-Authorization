const User = require("../models/User.model");
const bcrypt = require("bcrypt");

exports.signupGetController = async (req, res, next) => {
	const { username, email, password } = req.body;
	res.render("pages/signup", { title: "Signup" });
};

exports.signupPostController = async (req, res, next) => {
	const { username, email, password } = req.body;
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