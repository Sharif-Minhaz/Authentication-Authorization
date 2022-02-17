const express = require("express");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const middleware = [
	express.static("public"),
	express.json(),
	express.urlencoded({ extended: true }),
	session({
		secret: "mySecret",
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 2, // 2 hours
		},
	}),
	flash(),
];

module.exports = (app) => {
	middleware.forEach((m) => {
		app.use(m);
	});
};
