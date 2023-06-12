require("./models/database");
const express = require("express");
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const webRoute = require("./routes/WebRoute");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "views");

app.listen(8000, () => {
  console.log("server is listening at port:8000");
});
app.use("/websrape/website", webRoute);
