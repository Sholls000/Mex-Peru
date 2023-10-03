// const bcrypt = require("bcrypt");
// const peruAdminUsers = require("../models/peruAdminUsers");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
import bcrypt from "bcrypt"
import peruAdminUsers from "../models/peruAdminUsers.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"


dotenv.config();

 const peruAdminlogin = async (req, res) => {
  // Get User email and password from the request body
  const { email, password } = req.body;

  try {
    // Check if the email the user is logging with is registered
    // on the database and if it is then return the user email and password
    // from the database.
    const adminUser = await peruAdminUsers.findOne({ where: { email } });

    if (adminUser) {
      // Check if the password the user enter is the same
      // with the password on the database
      const passwordValid = bcrypt.compareSync(
        password,
        adminUser.password
      );

      if (passwordValid) {
        // If the password is matches then sign the user in
        // with a token
        const token = jwt.sign({ email, password }, process.env.SECRET_KEY, {
          expiresIn: process.env.EXPIRES_IN,
        });

        res.status(201).json({
          message: "Login Successfull",
          token,
        });
      } 
      else {
        res.status(401).json({
          message: "You are not authorized to access this page",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid Email or Password",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export default peruAdminlogin;