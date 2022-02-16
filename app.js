const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

const useMiddlewares = require("./middlewares/middleware");
const useRouter = require("./routers/route");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

useMiddlewares(app);
useRouter(app);

const { DB_PORT } = process.env;
const port = process.env.PORT || 8080;

mongoose
	.connect(`mongodb://localhost:${DB_PORT}/revise-auth`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.info("Connected with the mongodb");
		app.listen(port, () => {
			console.log(`Server running at http://localhost:${port}`);
		});
	})
	.catch((err) => console.error(err));
