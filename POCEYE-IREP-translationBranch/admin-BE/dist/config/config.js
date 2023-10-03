"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbConfig = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// require("dotenv").config()

_dotenv["default"].config();
var dbConfig = exports.dbConfig = {
  "environment": process.env.NODE_ENV || 'development',
  "port": process.env.DB_PORT || 5000,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_DATABASE,
  "host": process.env.DB_HOST,
  //   "dbPort": process.env.DB_PORT,y
  "dialect": "mssql"
};