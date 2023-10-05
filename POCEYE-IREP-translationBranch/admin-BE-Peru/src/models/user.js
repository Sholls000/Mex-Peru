
import { Sequelize, DataTypes } from "sequelize";
// init DataTypes
// const { DataTypes } = Sequelize;
import db from "../config/database.js";
import bcrypt from "bcrypt";
// Define schema
 const User = db.define(
  "userr",
  // "User",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activated: {
      type: DataTypes.STRING,
    },
    region: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "userr",
    // tableName: "Users",
  }
);

// Check if The Database has a table User
// If not the create a table User
// (async () => {
//   await User.sync();
// })();

export default User;
