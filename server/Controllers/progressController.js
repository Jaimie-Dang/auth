const asyncHandler = require("express-async-handler");
const UserModel = require("../Models/userModel");
const CourseModel = require("../Models/course");
const CourseSectionModel = require("../Models/CourseSection");

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
  // ! Start a section
  startSection: asyncHandler(async (req, res) => {
    const { courseId, sectionId } = req.body;

    try {
      // Tìm user
      const userFound = await UserModel.findById(req.decodedData.id);
      if (!userFound) {
        return res.status(404).json({ message: "User not found" });
      }

      // Tìm course progress của user
      const courseProgress = userFound.progress.find(
        (p) => p.courseId.toString() === courseId
      );
      if (!courseProgress) {
        return res
          .status(404)
          .json({ message: "Course not found in user's progress" });
      }

      // Kiểm tra nếu section đã được bắt đầu
      const existingSection = courseProgress.sections.find(
        (s) => s.sectionId.toString() === sectionId
      );
      if (existingSection) {
        return res.status(400).json({ message: "Section already started" });
      }

      // Thêm section mới vào course progress của user
      courseProgress.sections.push({
        sectionId,
        status: "Not Started",
        enrolled: true,
      });
      await userFound.save();

      // Gửi phản hồi thành công
      res
        .status(200)
        .json({ message: "Section started successfully", sectionId });
    } catch (error) {
      console.error("Error starting section:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }),

  // ! Update progress
  update: asyncHandler(async (req, res) => {
    const { courseId, sectionId, newStatus } = req.body;
    // ! Find the user and the specific course progress
    const userId = req.decodedData.id;
    console.log("Test update server:");
    console.log(courseId);
    const user = await UserModel.findOne({
      _id: userId,
      "progress.courseId": courseId,
    });
    if (!user) {
      return res.status(404).json({ message: "User or course not found" });
    }
    // ! Find and update the specific section status
    const courseProgress = user.progress.find(
      (p) => p.courseId.toString() === courseId
    );
    const sectionProgress = courseProgress.sections.find(
      (s) => s.sectionId.toString() === sectionId
    );
    if (sectionProgress) {
      sectionProgress.status = newStatus;
      await sectionProgress.save();
    } else {
      return res
        .status(404)
        .json({ message: "Section not found in user's progress" });
    }
    await user.save();
    // ! Send the response
    res.status(200).json({ message: "Section progress updated successfully" });
  }),
};

module.exports = progressController;
