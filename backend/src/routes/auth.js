const express = require("express");
const { sigup, login, logout } = require("../controllers/auth");

const router = express.Router();

router.post("/signup", sigup);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
