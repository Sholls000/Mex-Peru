import { Sequelize } from "sequelize";
import db from "../config/database.js";
import bcrypt from "bcrypt";

const { DataTypes } = Sequelize;

const peruAdminUsers = db.define("super_admin_tb",
 {
  // id: {
  //   type: DataTypes.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true,
  //   allowNull: false,
  // },
  email: {
    type: DataTypes.STRING,
    isEmail: true,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
},
{
  // tableName: "adminUsers",
  tableName: "super_admin_tb",
});

// Check if The Database has a table peruAdminUsers
// If not the create a table peruAdminUsers
(async () => {
  // await peruAdminUsers.sync();
  await peruAdminUsers.sync(
    // {force: true}
    );
  

  // await peruAdminUsers.create({ email: "tobiPeru@gmail.com", password: bcrypt.hashSync("tobiPeru", 10),
  // });
})();

export default peruAdminUsers;
