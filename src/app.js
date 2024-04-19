const path = require("path");
require("dotenv").config();
const express = require("express");
const app = express();
const handleBars = require("express-handlebars");

const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

//Init middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan("dev")); // Change color status in terminal
app.use(helmet()); // Hidden infomation of website
app.use(compression()); // Decrease load data

//Template engine
app.engine(
  "hbs",
  handleBars.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      json: (content) => JSON.stringify(content),
      prodClassFromName: (prodName) => prodName.replaceAll(" ", "-"),
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//set up when using
//app.use('/static', express.static(`${__dirname}\\public`))

//Connect DB
require("./dbs/mongo.db");

//router
app.use("", require("./routers"));

// handle error
// app.use((req, res, next) => {
//   const error = new Error("Not Found");
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   const statusCode = error.status || 500;
//   return res.status(statusCode).json({
//     status: "error",
//     code: statusCode,
//     message: error.message || "Internal Server Error",
//   });
// });

app.get("/", (req, res) => {
  res.render("home");
});

module.exports = app;
