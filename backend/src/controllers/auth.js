const User = require("../models/user");
const bcrypt = require("bcrypt");

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
    res.json({ message: "user created successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const login = (req, res) => {
  res.send("login");
};

const logout = (req, res) => {
  res.send("logout");
};

module.exports = {
  sigup,
  login,
  logout,
};
