const express = require("express");
const session = require("express-session");
require("dotenv").config();
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const { bindUserWithRequest } = require("./auth.middleware");
const setLocals = require("./setLocal.middlewares");

const { DB_PORT } = process.env;

const sessionStore = new MongoDBStore({
	uri: `mongodb://localhost:${DB_PORT}/revise-auth`,
	collection: "sessions",
});
// Catch errors
sessionStore.on("error", (err) => {
	console.error(err);
});

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
		store: sessionStore,
	}),
	flash(),
	bindUserWithRequest(),
	setLocals(),
];

module.exports = (app) => {
	middleware.forEach((m) => {
		app.use(m);
	});
};
