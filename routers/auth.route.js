const router = require("express").Router();
const {
	signupGetController,
	signupPostController,
	loginGetController,
	loginPostController,
	logoutController,
} = require("../controllers/auth.controller");

const { isAuthenticated, isUnAuthenticated } = require("../middlewares/auth.middleware");

const signupValidator = require("../validator/auth/signup.validator");
const loginValidator = require("../validator/auth/login.validator");

router.get("/signup",isUnAuthenticated, signupGetController);
router.post("/signup",isUnAuthenticated, signupValidator, signupPostController);

router.get("/login",isUnAuthenticated, loginGetController);
router.post("/login",isUnAuthenticated, loginValidator, loginPostController);

router.get("/logout", logoutController);

module.exports = router;
