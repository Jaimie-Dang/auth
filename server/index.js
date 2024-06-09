const express = require("express");

const cors = require("cors");

const morgan = require("morgan");
const connectDB = require("./Configs/db");
const progressRouter = require("./UserRoutes/progressRoute");

const dotenv = require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors());
app.use(morgan("dev"));

app.get("/test", (req, res) => {
  res.json("working");
});

// ! Routes
// /user/register
app.use("/user", require("./UserRoutes/userRoute"));
app.use("/course", require("./UserRoutes/courseRoute"));
app.use("/course-sections", require("./UserRoutes/courseSectionRoute"));
app.use("/progress", progressRouter);

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log(`App listening on port ${process.env.PORT}`);
});
