// // Import express
// import express from "express";
// // Import Controller Product
// import {
//     getProducts,
//     getProductById,
//     createProduct,
//     updateProduct,
//     deleteProduct
//  } from "../controllers/Product.js";

//  // Init express router
// const router = express.Router();

// // Route get semua product
// router.get('/products', getProducts);
// // Route get product by id
// router.get('/products/:id', getProductById);
// // Route create product baru
// router.post('/products', createProduct);
// // Route update product by id
// router.put('/products/:id', updateProduct);
// // Route delete product by id
// router.delete('/products/:id', deleteProduct);

// // export router
// export default router;

// Import express
import express from "express";
// Import Controller Product
import verifyToken from "../middlewares/authMiddleware.js";
import cors from "cors";
import { getAllUsers, updateByEmail } from "../controllers/User.js";
import { getAllPocs, findPoc, changeCoordinates } from "../controllers/Poc.js";
// import login from "../controllers/adminUser.js";
// import login from "../controllers/adminUser.js";
// import { login } from "../controllers/adminUser.js";
import { login } from "../controllers/adminUser.js";
// Init express router
const router = express.Router();
router.get("/allusers", getAllUsers);
router.get("/getallpocs", getAllPocs);
router.put("/resetpassword/:id", updateByEmail);
router.get("/getPoc/:id", findPoc);
router.post("/changecoordinates", changeCoordinates);
router.post("/login", login);
// export router
export default router;
