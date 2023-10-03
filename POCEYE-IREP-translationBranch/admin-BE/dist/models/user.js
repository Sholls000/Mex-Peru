"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _database = _interopRequireDefault(require("../config/database.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import connection

// init DataTypes
var DataTypes = _sequelize.Sequelize.DataTypes;

// Define schema
var User = _database["default"].define("userr", {
  // Model attributes are defined here
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  activated: {
    type: DataTypes.STRING
  },
  region: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.STRING
  }
}, {
  tableName: "userr"
});
var _default = exports["default"] = User;