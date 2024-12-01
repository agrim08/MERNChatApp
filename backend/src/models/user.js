const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const JWT_KEY = process.env.JWT_KEY;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validator: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      validator: (value) => {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password should be strong");
        }
      },
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema.methods.validatePassword = async function (userEnteredPassword) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    userEnteredPassword,
    passwordHash
  );
  return isPasswordValid;
};

userSchema.methods.getJwt = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, JWT_KEY, {
    expiresIn: "7d",
  });
  return token;
};

module.exports = mongoose.model("User", userSchema);
