import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const verifyToken = (req, res, next) => {
  const headerAutorization = req.headers["autorization"];
  if (typeof headerAutorization !== "undefined") {
    const token = headerAutorization.split(" ")[1];
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

export default verifyToken;
