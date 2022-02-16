const User = require("../../models/User.model");
const { body } = require("express-validator");

module.exports = [
	body("username")
		.isLength({ min: 2, max: 15 })
		.withMessage("Username must be 2 to 15 characters long")
		.trim()
		.custom(async (username) => {
			let user = await User.findOne({ username });
			if (user) {
				return Promise.reject("Username already in use");
			}
		}),
	body("email")
		.isEmail()
		.withMessage("Please provide a valid email")
		.normalizeEmail()
		.custom(async (email) => {
			let user = await User.findOne({ email });
			if (user) {
				return Promise.reject("Email already in use");
			}
		}),
    body("password").not().isEmpty()
];
