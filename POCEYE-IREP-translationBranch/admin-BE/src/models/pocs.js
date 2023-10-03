import { Sequelize } from "sequelize";
// import connection
import db from "../config/database.js";
// init DataTypes
const { DataTypes } = Sequelize;

const Poc = db.define(
  // "Poc",
  "poc_tb",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    region: {
      type: DataTypes.STRING,
    },
    district: {
      type: DataTypes.STRING,
    },
    pocId: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    schedule: {
      type: DataTypes.STRING,
    },
    foto_interior_cooler: {
      type: DataTypes.STRING,
    },
    foto_poster_de_promos: {
      type: DataTypes.STRING,
    },
    foto_ref_pue_cooler: {
      type: DataTypes.STRING,
    },
    inno_conc: {
      type: DataTypes.STRING,
    },
    poster_above_core: {
      type: DataTypes.STRING,
    },
    outlet: {
      type: DataTypes.STRING,
    },
    ba_foto_interior_cooler: {
      type: DataTypes.STRING,
    },
    ba_foto_tent_card: {
      type: DataTypes.STRING,
    },
  },
  {
    // tableName: "Pocs",
    tableName: "poc_tb",
  }
);

// User.sync({alter: true})
export default Poc;
