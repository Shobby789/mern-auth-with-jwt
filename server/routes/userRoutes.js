const express = require("express");
const {
  CreateUser,
  LoginUser,
  GetUserList,
} = require("../controller/userController");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const router = express.Router();

router.post("/create-user", CreateUser);

router.post("/login", LoginUser);

router.get("/users", authenticate, authorize(["Admin"]), GetUserList);

module.exports = router;
