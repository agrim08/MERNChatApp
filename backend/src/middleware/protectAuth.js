const User = require("../models/user");
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;

const protectAuth = async (req, res, next) => {
  try {
    const { token } = res.cookie;
    if (!token)
      return res.status(404).json({ message: "Invalid Authorization" });

    const decodeUser = jwt.verify(token, JWT_KEY);

    if (!decodeUser)
      return res.status(404).json({ message: "Invalid Authorization" });

    const user = await User.findById(decodeUser._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = protectAuth;
