module.exports = {
  sendBadRequest(res, message, code = 400) {
    res.status(code).json({
      message: Array.isArray(message) ? message : [{ message }],
      success: false,
    });
  },

  sendServerError(res, code = 500) {
    res.status(code).json({
      message: "Somethings went wrong.",
      success: false,
    });
  },

  sendNotFound(res, code = 404) {
    res.status(code).json({
      message: "Record not found.",
      success: false,
    });
  },

  sendUnauthorized(res, code = 401) {
    res.status(code).json({
      message: "Unauthorized",
      success: false,
    });
  },

  sendForbidden(res, code = 403) {
    res.status(code).json({
      message: "Forbidden",
      success: false,
    });
  },

  sendResponse(res, data) {
    if (!isObject(data)) {
      data = {
        data,
      };
    }
    data.success = true;
    res.status(200).json(data);
  },
};

function isObject(val) {
  return !!val && typeof val === "object" && !Array.isArray(val);
}
