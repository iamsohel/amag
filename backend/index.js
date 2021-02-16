const logger = require("./libs/logger");
const express = require("express");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");

const app = express();
require("dotenv").config();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['asdfasdf'],
  })
);

require("./startup/logging");
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/prod")(app);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to our API" });
});

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  logger.log(`Listening on port ${port}...`)
);

// print unhandled promise rejections
process.on("unhandledRejection", (error) => {
  // use logger so it is on one line in cloudwatch (easier to track visually)
  logger.error("mishandledRejection", error.message, error.stack);
});

module.exports = server;
