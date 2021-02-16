const express = require("express");
const auth = require("../routes/auth");
const forms = require("../routes/forms");
const logs = require("../routes/auditLogs");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/forms", forms);
  app.use("/api/audit-logs", logs);
  app.use(error);
};
