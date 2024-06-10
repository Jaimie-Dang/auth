const express = require("express");

const cors = require("cors");

const morgan = require("morgan");
const connectDB = require("./Configs/db");
const progressRouter = require("./UserRoutes/progressRoute");

const dotenv = require("dotenv").config();

const app = express();
app.use(express.json());
// cors
const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
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
