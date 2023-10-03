"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authMiddleware = require("../middlewares/authMiddleware.js");
var _User = require("../controllers/User.js");
var _Poc = require("../controllers/Poc.js");
var _peruAdminLogin = _interopRequireDefault(require("../controllers/peruAdminLogin.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Import Controller

// Init express router
var router = _express["default"].Router();

// Router routes
router.get("/allusers", _User.getAllUsers);
router.get("/getallpocs", _Poc.getAllPocs);
router.put("/resetpassword/:id", _User.updateByEmail);
router.get("/getPoc/:id", _Poc.findPoc);
router.post("/changecoordinates", _Poc.changeCoordinates);
router.post("/login", _peruAdminLogin["default"]);

// export router
var _default = exports["default"] = router;