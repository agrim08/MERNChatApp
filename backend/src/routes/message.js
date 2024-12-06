import express from "express";
import protectAuth from "../middleware/protectAuth";
import {
  getUsersForSideBar,
  getMessages,
  sendMessage,
} from "../controllers/message";

const router = express.Router();

router.get("/users", protectAuth, getUsersForSideBar);
router.get("/:id", protectAuth, getMessages);
router.post("/send/:id", protectAuth, sendMessage);

module.exports = router;
