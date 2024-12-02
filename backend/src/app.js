const express = require("express");
const authRouter = require("./routes/auth");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");
const messageRouter = require("./routes/message");

const app = express();

app.use(express.json());
app.use(cookieParser());
dotenv.config();

const PORT = process.env.PORT;

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

app.listen(PORT, () => {
  try {
    console.log("server listening on port:" + PORT);
    connectDb();
  } catch (error) {
    console.log(`ERROR:${error}`);
  }
});
