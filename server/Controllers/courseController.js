const CourseModel = require("../Models/course");
const UserModel = require("../Models/userModel");
const asyncHandler = require("express-async-handler");

const courseController = {
  create: asyncHandler(async (req, res) => {
    const { title, description, difficulty, duration } = req.body;

    // Check user: be existed or not!
    // !Find the user
    const userFound = await UserModel.findById(req.decodedData.id);
    console.log("test");
    console.log(userFound);
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }
    if (userFound.role !== "instructor") {
      return res.status(401).json({
        message: "You are not authorized to create a course, instructors only",
      });
    }
    console.log(userFound);

    if (!title || !description || !difficulty || !duration) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const courseFound = await CourseModel.findOne({ title });

    if (courseFound) {
      return res.status(400).json({ message: "Course already exists" });
    }

    const coursesCreated = await CourseModel.create({
      title,
      description,
      difficulty,
      duration,
      user: req.decodedData.id,
    });

    userFound.coursesCreated.push(coursesCreated._id);

    await userFound.save();

    res.status(201).json(coursesCreated);
  }),
};

module.exports = courseController;
