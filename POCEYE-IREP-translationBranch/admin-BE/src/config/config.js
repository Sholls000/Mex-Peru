// require("dotenv").config()
import dotenv from "dotenv"

dotenv.config();

export const dbConfig = {
    "environment": process.env.NODE_ENV || 'development',
    // "port": process.env.DB_PORT || 5000,
      "username": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_DATABASE,
      "host": process.env.DB_HOST,
    //   "dbPort": process.env.DB_PORT,y
      "dialect": "mssql",
   
  };

