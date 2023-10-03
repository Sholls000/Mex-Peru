"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// const dotenv = require("dotenv");

_dotenv["default"].config();
var verifyToken = exports.verifyToken = function verifyToken(req, res, next) {
  // On the request check the if the headers has authorization attribute
  var headerAuthorization = req.headers["authorization"];

  // check if the authorization attribute is not undefined
  if (typeof headerAuthorization !== "undefined") {
    // Get the token from the Authorization attribute
    var token = headerAuthorization.split(" ")[1];
    // Verify if the token is valid
    _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY, function (err, userData) {
      if (err) {
        res.status(403);
      }
      req.user = userData;
      next();
    });
  } else {
    res.status(401);
  }
};