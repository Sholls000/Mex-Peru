import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";
import bcrypt from "bcrypt";

// const { DataTypes } = Sequelize;

const Poc = db.define(
  "poc_tb",
  // "Pocs",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    idbees: {
      type: DataTypes.STRING,
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
    SalesDivision: {
      type: DataTypes.STRING,
    },
    SalesManagement: {
      type: DataTypes.STRING,
    },
    Da: {
      type: DataTypes.STRING,
    },
    schedule: {
      type: DataTypes.STRING,
    },
    // foto_interior_cooler: {
    //   type: DataTypes.STRING,
    // },
    // foto_poster_de_promos: {
    //   type: DataTypes.STRING,
    // },
    // foto_ref_pue_cooler: {
    //   type: DataTypes.STRING,
    // },
    // inno_conc: {
    //   type: DataTypes.STRING,
    // },
    // poster_above_core: {
    //   type: DataTypes.STRING,
    // },
    outlet: {
      type: DataTypes.STRING,
    },
    // ba_foto_interior_cooler: {
    //   type: DataTypes.STRING,
    // },
    // ba_foto_tent_card: {
    //   type: DataTypes.STRING,
    // },
  },
  {
    tableName: "poc_tb",
    // tableName: "Pocs",
  }
);

// Check if The Database has a table Poc
// If the table is not available create a table named Poc
(async () => {
  await Poc.sync();
})();

export default Poc;
