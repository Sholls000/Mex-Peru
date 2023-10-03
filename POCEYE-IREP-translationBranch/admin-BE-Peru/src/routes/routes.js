import express from "express";

// Import Controller
import { verifyToken } from "../middlewares/authMiddleware.js";
import { getAllUsers, updateByEmail } from "../controllers/User.js";
import {getAllPocs, findPoc, changeCoordinates} from "../controllers/Poc.js"

import peruAdminLogin from "../controllers/peruAdminLogin.js";

// Init express router
const router = express.Router();

// Router routes
router.get("/allusers", getAllUsers);
router.get("/getallpocs", getAllPocs);
router.put("/resetpassword/:id",  updateByEmail);
router.get("/getPoc/:id", findPoc);
router.post("/changecoordinates",  changeCoordinates);
router.post("/login", peruAdminLogin);

// export router
export default router; 

