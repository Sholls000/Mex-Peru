"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _config = require("./config.js");
// import sequelize

// create connection
var db = new _sequelize.Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mssql",
  port: process.env.DB_PORT,
  dialectOptions: {
    // instanceName: "SQLEXPRESS",
    instanceName: "poceyesqlserver.database.windows.net",
    trustServerCertificate: true,
    connectTimeout: 10000
  },
  logging: function logging() {
    for (var _len = arguments.length, msg = new Array(_len), _key = 0; _key < _len; _key++) {
      msg[_key] = arguments[_key];
    }
    return console.log(msg);
  },
  pool: {
    max: 50,
    min: 0,
    idle: 10000
  }
});
var _default = exports["default"] = db;