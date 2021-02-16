const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const responseService = require("../libs/responseService");

module.exports = function (req, res, next) {
  
  const bearerToken = req.headers.authorization;
  if (!bearerToken) return responseService.sendUnauthorized(res);
  const token = bearerToken.split(" ")[1];
  if (!token) return responseService.sendUnauthorized(res);
  try {
    const decoded = jwt.verify(token, keys.jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (ex) {
    return responseService.sendForbidden(res, "No token provided.");
  }
};


