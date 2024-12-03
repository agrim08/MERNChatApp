const User = require("../models/user");
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinary");

const sigup = async (req, res) => {
  const { email, fullName, password, profilePic } = req.body;

  try {
    if (!email || !fullName || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      fullName,
      password: passwordHash,
      profilePic,
    });
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Request received with email:", email);
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }
    console.log("User found, validating password");
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      console.log("Password valid, generating token");
      const token = await user.getJwt();
      res.cookie("token", token);
      return res.send("login successful");
    } else {
      console.log("Invalid Credentials");
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.json({ message: "logout successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ error: "Profile picture is required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updateduser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );
    res.status(200).json(updateduser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  sigup,
  login,
  logout,
  updateProfile,
  checkAuth,
};
