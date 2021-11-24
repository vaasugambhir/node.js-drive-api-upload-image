const express = require("express");
const app = express();
const fileRouter = require("./routers/fileRouter");
require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Drive API server");
});

app.use("/file", fileRouter);

app.listen(process.env.PORT, () => {
  console.log("Server listening at port", process.env.PORT);
});
