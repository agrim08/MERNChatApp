import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/auth.js";
import protectAuth from "../middleware/protectAuth";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectAuth, updateProfile);
router.get("/check", protectAuth, checkAuth);

module.exports = router;
