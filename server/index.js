const express = require("express");

const cors = require("cors");

const morgan = require("morgan");
const connectDB = require("./configs/db");

const dotenv = require("dotenv").config();

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.get("/test", (req, res) => {
  res.json("working");
});

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log(`App listening on port ${process.env.PORT}`);
});
