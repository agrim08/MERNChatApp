const express = require("express");
const userAuth = require("./routes/auth");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT;

app.use("/api/auth", userAuth);

app.listen(PORT, () => {
  try {
    console.log("server listening on port:" + PORT);
    connectDb();
  } catch (error) {
    console.log(`ERROR:${error}`);
  }
});
