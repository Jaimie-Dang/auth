const { default: mongoose } = require("mongoose");
const CourseModel = require("../Models/course");
const UserModel = require("userModel");
const asyncHandler = require("express-async-handler");
const CourseSectionModel = require("../Models/CourseSection");

const courseSectionController = {
  create: asyncHandler(async (req, res) => {
    // Check user: be existed or not!
    // !Find the user
    const userFound = await UserModel.findById(req.decodedData.id);
    console.log("test2");
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
      return res.status(400).json({ message: "Invalid course ID" });
    }

    // ! Find the course
    const course = await CourseModel.findById(courseId);
    console.log("courseId");
    console.log(course);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Validate the section name
    if (!sectionName) {
      return res.status(400).json({ message: "Section name is required" });
    }

    // Create the section
    const sectionCreated = await CourseSectionModel.create({
      sectionName,
      user: req.decodedData.id,
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
  // ! Lists
  lists: asyncHandler(async (req, res) => {
    const courseSections = await CourseSectionModel.find();
    res.json(courseSections);
  }),
  // ! Get a single course section
  getSection: asyncHandler(async (req, res) => {
    const courseSection = await CourseSectionModel.findById(
      req.params.courseId
    );
    if (courseSection) {
      res.json(courseSection);
    } else {
      res.status(404); // Meaning not found
      throw new Error("Section not found");
    }
  }),
  // ! Update
  update: asyncHandler(async (req, res) => {
    const section = await CourseSectionModel.findByIdAndUpdate(
      req.params.sectionId,
      req.body,
      { new: true }
    );
    if (section) {
      res.json(section);
    } else {
      res.status(404);
      throw new Error("Section not found");
    }
  }),
  // ! Delete
  delete: asyncHandler(async (req, res) => {
    // ! Find the section to be deleted
    const sectionFound = await CourseSectionModel.findById(
      req.params.sectionId
    );

    if (!sectionFound) {
      res.status(404);
      res.json({ message: "Section not found" });
      return;
    }
    // ! Find the course associated with the section to check for enrolled students
    const course = await CourseModel.findOne({
      sections: req.params.sectionId,
    }).populate("students");

    if (!course) {
      res.status(404).json({ message: "Associated course not found" });
    }
    // ! Check if the course has any students enrolled
    if (course.students.length > 0) {
      res.status(400).json({
        message: "Associated course has students, cannot delete section",
      });
      return;
    }
    // ! Proceed to delete
    await CourseSectionModel.findByIdAndDelete(req.params.sectionId);
    // ! Remove the section from the course's sections array
    await CourseModel.findByIdAndUpdate(course._id, {
      $pull: { sections: req.params.sectionId },
    });
    res.json({ message: "Section delete successfully" });
  }),
};

module.exports = courseSectionController;
