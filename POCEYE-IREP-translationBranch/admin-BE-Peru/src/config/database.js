// import sequelize
import { Sequelize } from "sequelize";
import { dbConfig } from "./config.js";

// create connection
const  db = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mssql",
    port: process.env.DB_PORT,
    dialectOptions: {
      // instanceName: "SQLEXPRESS",
      instanceName: "poceyesqlserver.database.windows.net",
      trustServerCertificate: true,
      connectTimeout: 10000,
    },
    logging: (...msg) => console.log(msg),
    pool: {
      max: 50,
      min: 0,
      idle: 10000,
    },
  }
);

export default db;
