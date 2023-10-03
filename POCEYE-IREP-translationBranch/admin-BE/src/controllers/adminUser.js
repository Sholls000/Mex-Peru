import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import adminUsers from "../models/adminUsers.js";
import * as dotenv from "dotenv";
dotenv.config();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await adminUsers.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      // const adminUserData = await user;
      const validatePasswordInput = await bcrypt.compare(
        password,
        user.password
      );
      if (validatePasswordInput) {
        const token = jwt.sign({ user }, process.env.SECRET_KEY);

        res.status(201).json({message: "Login successful", token });
      } else {
        res.status(401).json({ message: "You are not authorized to access this page" });
      }
    } else if (!user) {
      res.status(400).json({ message: "Invalid Email or Password" });
    }
  } catch (err) {
  }
};
