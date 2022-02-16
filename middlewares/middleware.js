const express = require("express");

const middleware = [
	express.static("public"),
	express.json(),
	express.urlencoded({ extended: true }),
];

module.exports = (app) => {
    middleware.forEach((m)=> {
        app.use(m);
    })
}