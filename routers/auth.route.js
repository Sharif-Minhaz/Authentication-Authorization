const router = require("express").Router();
const {
	signupGetController,
	signupPostController,
	loginGetController,
	loginPostController,
} = require("../controllers/auth.controller");

const signupValidator = require("../validator/auth/signup.validator");
const loginValidator = require("../validator/auth/login.validator");

router.get("/signup", signupGetController);
router.post("/signup", signupValidator, signupPostController);

router.get("/login", loginGetController);
router.post("/login", loginValidator, loginPostController);

module.exports = router;
