"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authMiddleware = _interopRequireDefault(require("../middlewares/authMiddleware.js"));
var _cors = _interopRequireDefault(require("cors"));
var _User = require("../controllers/User.js");
var _Poc = require("../controllers/Poc.js");
var _adminUser = require("../controllers/adminUser.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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

// Import Controller Product

// import login from "../controllers/adminUser.js";
// import login from "../controllers/adminUser.js";
// import { login } from "../controllers/adminUser.js";
// Init express router
var router = _express["default"].Router();
router.get("/allusers", _User.getAllUsers);
router.get("/getallpocs", _Poc.getAllPocs);
router.put("/resetpassword/:id", _User.updateByEmail);
router.get("/getPoc/:id", _Poc.findPoc);
router.post("/changecoordinates", _Poc.changeCoordinates);
router.post("/login", _adminUser.login);
// export router
var _default = exports["default"] = router;