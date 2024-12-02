const User = require("../models/user");
const Message = require("../models/message");
const { cloudinary_js_config: cloudinary } = require("../config/cloudinary");

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
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, recieverId: userToChatId },
        { senderId: userToChatId, recieverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!text && !image) {
      return res
        .status(400)
        .json({ error: "Message must contain text or an image" });
    }

    let imgUrl;
    if (image) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imgUrl = uploadResponse.secure_url;
      } catch (err) {
        return res.status(400).json({ error: "Image upload failed" });
      }
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imgUrl,
    });

    //todo :realtime chat goes here
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getUsersForSideBar, getMessages, sendMessage };
