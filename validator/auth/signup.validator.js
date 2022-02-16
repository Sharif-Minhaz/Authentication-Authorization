const User = require("../../models/User.model");
const { body } = require("express-validator");

module.exports = [
	body("username")
		.not()
		.isEmpty()
		.withMessage("Username cannot be blank")
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
	body("password")
		.not()
		.isEmpty()
		.withMessage("Password can not be empty")
		.isLength({ min: 5, max: 16 })
		.withMessage("Password must be between 5 to 16 characters"),
	body("confirmPassword")
		.not()
		.isEmpty()
		.withMessage("Confirm password can not be empty")
		.custom(async (confirmPassword, {req}) => {
            if (confirmPassword !== req.password) {
                throw new Error("Password does not matched");
            }
            return true;
        }),
];
