const express = require("express");
const protectAuth = require("../middleware/protectAuth");
const {
  getUsersForSideBar,
  getMessages,
  sendMessage,
} = require("../controllers/message");
const router = express.Router();

router.get("/users", protectAuth, getUsersForSideBar);
router.get("/:id", protectAuth, getMessages);
router.post("/send/:id", protectAuth, sendMessage);

module.exports = router;
