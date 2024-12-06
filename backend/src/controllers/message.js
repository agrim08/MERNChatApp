import sharp from "sharp";
import User from "../models/user";
import Message from "../models/message";
import cloudinary from "../config/cloudinary";
import { getReceiverSocketId, io } from "../config/socket";

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
        // Decode base64 string to buffer
        const buffer = Buffer.from(image.split(",")[1], "base64");

        // Compress image using sharp
        const compressedImage = await sharp(buffer)
          .resize(800) // Resize to a width of 800px (preserving aspect ratio)
          .jpeg({ quality: 70 }) // Convert to JPEG with 70% quality
          .toBuffer();

        // Re-encode to base64 for uploading to Cloudinary
        const compressedBase64 = `data:image/jpeg;base64,${compressedImage.toString(
          "base64"
        )}`;

        // Upload compressed image to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(
          compressedBase64
        );
        imgUrl = uploadResponse.secure_url;
      } catch (err) {
        console.error("Image processing/upload error:", err);
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
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getUsersForSideBar, getMessages, sendMessage };
