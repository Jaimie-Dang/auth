const asyncHandler = require("express-async-handler");
const UserModel = require("../Models/userModel");
const CourseModel = require("../Models/course");

const progressController = {
  // ! Apply to a course
  appToCourse: asyncHandler(async (req, res) => {
    const userId = req.user;
    const { courseId } = req.body;
    // ! Find the user
    const userFound = await UserModel.findById(req.decodedData.id);
    console.log("test3");
    console.log(userFound);
    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }
    // ! Check if the user is already enrolled in the course
    const isAlreadyEnrolled = userFound.progress.some(
      (progress) => progress.courseId.toString() === courseId.toString()
    );
    if (isAlreadyEnrolled) {
      return res
        .status(400)
        .json({ message: "You have already enrolled in this course" });
    }
    // ! Validate the course
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // ! Add the course to user's progress
    userFound.progress.push({ courseId, sections: [] });
    // ! resave
    await userFound.save();
    // ! Push the user to the course
    course.students.push(userId);
    await course.save();
    res.status(200).json({ message: "Application to course successful" }); // Means - Everything is ok
  }),
};

module.exports = progressController;
