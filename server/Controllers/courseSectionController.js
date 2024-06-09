const { default: mongoose } = require("mongoose");
const CourseModel = require("../Models/course");
const UserModel = require("../Models/userModel");
const asyncHandler = require("express-async-handler");
const CourseSectionModel = require("../Models/CourseSection");

const courseSectionController = {
  create: asyncHandler(async (req, res) => {
    // Check user: be existed or not!
    // !Find the user
    const userFound = await UserModel.findById(req.decodedData.id);
    console.log("test");
    console.log(userFound);
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    // ! Get the section name
    const { sectionName } = req.body;

    // ! Get the courseID
    const { courseId } = req.params;

    // ! Validate the courseid
    if (!mongoose.isValidObjectId(courseId)) {
      throw new Error("Invalid course ID");
    }

    // ! Find the course
    const course = await CourseModel.findById(courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    // ! validate the section name
    const sectionCreated = await CourseSectionModel.create({
      sectionName,
      user: req.user,
    });

    // ! Add course section to a course
    course.sections.push(sectionCreated._id);

    // ! resave
    await course.save();

    res.json({
      message: "Section created successfully",
      data: sectionCreated,
      status: "success",
    });
  }),
};

module.exports = courseSectionController;
