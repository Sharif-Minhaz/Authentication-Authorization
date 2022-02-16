const router = require("express").Router();
const {getHomeController} = require("../controllers/home.controller");

router.get("/", getHomeController);

module.exports = router;
