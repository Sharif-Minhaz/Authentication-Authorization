const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const { DB_PORT } = process.env;

const store = new MongoDBStore({
	uri: `mongodb://localhost:${DB_PORT}/revise-auth`,
	collection: "sessions",
});
// Catch errors
store.on("error", (err) => {
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
		store: store,
	}),
	flash(),
];

module.exports = (app) => {
	middleware.forEach((m) => {
		app.use(m);
	});
};
