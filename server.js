// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
const usersRoutes = require("./routes/users");
const pollsRoutes = require("./routes/polls");
const voteRoutes = require("./routes/vote");
const resultRoutes = require("./routes/results");


// Mount all resource routes
app.use("/api/users", usersRoutes(db));
app.use("/api/polls", pollsRoutes(db));
app.use("/api/vote", voteRoutes(db));
app.use("/api/results", resultRoutes(db));


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
