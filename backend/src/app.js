const express = require("express");
const authRouter = require("./routes/auth");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");
const messageRouter = require("./routes/message");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true, //tells browser to send cookie for cross-origin requests
  })
);
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
