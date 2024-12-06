const User = require("../models/user");
const Message = require("../models/message");
const cloudinary = require("../config/cloudinary");
const { getReceiverSocketId, io } = require("../config/socket");

const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; // The ID of the user you want to chat with
    const myId = req.user._id; // Your user ID from the auth middleware

    // Ensure the user and recipient IDs are properly used in the query
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId }, // Fixed "recieverId" to "receiverId"
        { senderId: userToChatId, receiverId: myId }, // Fixed "recieverId" to "receiverId"
      ],
    });

    // Return the found messages
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;

    if (!text && !image) {
      return res
        .status(400)
        .json({ error: "Message must contain text or an image" });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ error: "Receiver not found" });
    }

    let imgUrl = null;
    if (image) {
      try {
        const uploadResponse = await cloudinary?.uploader?.upload(image);
        imgUrl = uploadResponse?.secure_url;
      } catch (err) {
        console.error("Cloudinary upload error:", err);
        return res.status(500).json({ error: "Image upload failed" });
      }
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text: text || null,
      image: imgUrl,
    });

    console.log("Saving message:", newMessage);

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage); // Emit new message event to the receiver socket room
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getUsersForSideBar, getMessages, sendMessage };
