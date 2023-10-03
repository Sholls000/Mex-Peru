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
var Poc = _database["default"].define(
// "Poc",
"poc_tb", {
  // Model attributes are defined here
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },

  region: {
    type: DataTypes.STRING
  },
  district: {
    type: DataTypes.STRING
  },
  pocId: {
    type: DataTypes.STRING
  },
  longitude: {
    type: DataTypes.STRING
  },
  latitude: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  schedule: {
    type: DataTypes.STRING
  },
  foto_interior_cooler: {
    type: DataTypes.STRING
  },
  foto_poster_de_promos: {
    type: DataTypes.STRING
  },
  foto_ref_pue_cooler: {
    type: DataTypes.STRING
  },
  inno_conc: {
    type: DataTypes.STRING
  },
  poster_above_core: {
    type: DataTypes.STRING
  },
  outlet: {
    type: DataTypes.STRING
  },
  ba_foto_interior_cooler: {
    type: DataTypes.STRING
  },
  ba_foto_tent_card: {
    type: DataTypes.STRING
  }
}, {
  // tableName: "Pocs",
  tableName: "poc_tb"
});

// User.sync({alter: true})
var _default = exports["default"] = Poc;