const express = require("express");
const userAuth = require("./routes/auth");

const app = express();

app.use("/api/auth", userAuth);

app.listen(5000, () => {
  console.log("server listening on port 5000");
});
