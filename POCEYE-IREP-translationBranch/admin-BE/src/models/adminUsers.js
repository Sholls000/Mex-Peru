import { DataTypes } from "sequelize";
import db from "../config/database.js";
import bcrypt from "bcrypt";

const adminUsers = db.define(
  "super_admin_tb",
  {
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    //   allowNull: false,
    // },
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // tableName: "adminUsers",
    tableName: "super_admin_tb",
  }
);

(async () => {
  await adminUsers.sync();
  

  // await adminUsers.create({ email: "tobiMexico01@gmail.com", password: bcrypt.hashSync("tobiMex", 10),
  // });

})();

export default adminUsers;
