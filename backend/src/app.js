const express = require("express");
const authRouter = require("./routes/auth");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");
const messageRouter = require("./routes/message");
const cors = require("cors");
const { app, server } = require("./config/socket");
const path = require("path");

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true, //tells browser to send cookie for cross-origin requests
  })
);
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(204); // No Content
});
dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  try {
    console.log("server listening on port:" + PORT);
    connectDb();
  } catch (error) {
    console.log(`ERROR:${error}`);
  }
});
