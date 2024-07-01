const { default: mongoose } = require("mongoose");
const CourseModel = require("../Models/course");
const UserModel = require("../Models/userModel");
const asyncHandler = require("express-async-handler");
const CourseSectionModel = require("../Models/CourseSection");

const courseSectionController = {
  create: asyncHandler(async (req, res) => {
    const { typeSection } = req.body;
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
    if (!sectionName || !typeSection) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // Create the section
    const sectionCreated = await CourseSectionModel.create({
      sectionName,
      typeSection,
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
  update: asyncHandler(async (req, res, next) => {
    try {
      console.log("Test section");
      console.log("Section ID:", req.params.sectionId);
      console.log("Request Body:", req.body);

      // Kiểm tra định dạng của sectionId
      if (!mongoose.Types.ObjectId.isValid(req.params.sectionId)) {
        res.status(400);
        throw new Error("Invalid section ID format");
      }

      // Kiểm tra sự tồn tại của section
      const existingSection = await CourseSectionModel.findById(
        req.params.sectionId
      );
      if (!existingSection) {
        res.status(404);
        throw new Error("Section not found");
      }

      // Cập nhật section
      const section = await CourseSectionModel.findByIdAndUpdate(
        req.params.sectionId,
        req.body,
        { new: true }
      );

      console.log("Updated Section:", section);

      if (section) {
        res.json(section);
      } else {
        res.status(404);
        throw new Error("Section not found after update");
      }
    } catch (error) {
      console.error(error); // Thêm log chi tiết về lỗi
      next(error); // Chuyển lỗi tới middleware xử lý lỗi
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

  // startSection: async (req, res) => {
  //   const { sectionId } = req.body;

  //   try {
  //     // Kiểm tra xem sectionId có hợp lệ hay không
  //     const section = await CourseSection.findById(sectionId);
  //     if (!section) {
  //       return res.status(404).json({ message: "Section not found" });
  //     }

  //     // Cập nhật trạng thái của section và thêm vào sectionsCompleted
  //     section.isCompleted = true;
  //     section.sectionsCompleted.push(sectionId);

  //     // Lưu lại vào database
  //     await section.save();

  //     res
  //       .status(200)
  //       .json({ message: "Section started successfully", section });
  //   } catch (error) {
  //     console.error("Error starting section:", error);
  //     res.status(500).json({ message: "Internal server error" });
  //   }
  // },
};

module.exports = courseSectionController;
