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

  // ! Getting all courses
  lists: asyncHandler(async (req, res) => {
    const courses = await CourseModel.find().populate("sections").populate({
      path: "user",
      model: "Users",
      select: "username email",
    });
    res.json(courses);
  }),

  // ! Get a course
  getCourseById: asyncHandler(async (req, res) => {
    const course = await CourseModel.findById(req.params.courseId)
      .populate("sections")
      .populate({
        path: "user",
        model: "Users",
        select: "username email",
      });
    res.json(course);
  }),

  // ! Update course
  update: asyncHandler(async (req, res) => {
    const course = await CourseModel.findByIdAndUpdate(
      req.params.courseId,
      req.body,
      { new: true }
    );
    if (course) {
      res.json(course);
    } else {
      res.status(404);
      throw new Error("Course not found");
    }
  }),
  // ! Delete course
  delete: asyncHandler(async (req, res) => {
    console.log("Test");
    // ! Find the course
    const courseFound = await CourseModel.findById(req.params.courseId);
    console.log(courseFound);
    // ! Prevent deletion if a course a student
    if (courseFound && courseFound.students.length > 0) {
      res.status(400);
      res.json({ message: "Course has students, cannot delete" });
      return; //stop execution
    }
    // ! Proceed to delete
    const course = await CourseModel.findByIdAndDelete(req.params.courseId);
    if (course) {
      // * Remove from the user's course created
      await UserModel.updateMany(
        { coursesCreated: req.params.courseId },
        {
          $pull: { coursesCreated: req.params.courseId },
        }
      );
      // ! Send the response
      res.json(course);
    } else {
      res.json({ message: "Course not found" });
    }
  }),
};

module.exports = courseController;
