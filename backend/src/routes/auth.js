const express = require("express");
const {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
} = require("../controllers/auth");
const protectAuth = require("../middleware/protectAuth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectAuth, updateProfile);
router.get("/check", protectAuth, checkAuth);

module.exports = router;
