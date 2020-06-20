const express = require("express");
const app = express();

// Require listener func with giving app func
require("./startup/listener")(app);

// Require Body Parser func with giving app func
require("./startup/body-parser")(app);

// Require middleware func with giving blank func
require("./startup/middleware")();

// Require db connection
require("./startup/db");

// Require all routes with giving app func
require("./startup/routes")(app);
