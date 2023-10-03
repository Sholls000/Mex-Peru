// const dotenv = require("dotenv");
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

export const verifyToken = (req, res, next) => {
  // On the request check the if the headers has authorization attribute
  const headerAuthorization = req.headers["authorization"];

  // check if the authorization attribute is not undefined
  if (typeof headerAuthorization !== "undefined") {
    // Get the token from the Authorization attribute
    const token = headerAuthorization.split(" ")[1];
    // Verify if the token is valid
    jwt.verify(token, process.env.SECRET_KEY, (err, userData) => {
      if (err) {
        res.status(403);
      }
      req.user = userData;
      next();
    });
  } else {
    res.status(401);
  }
};

