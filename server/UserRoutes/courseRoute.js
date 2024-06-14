const JWT_AUTH = require("../middleware/JWT_AUTH");
const express = require("express");
const courseController = require("../Controllers/courseController");
const { isInstructor } = require("../middleware/roleAccessMiddleware");
const multer = require("multer");
const path = require("path");
const upload = require("../middleware/multer");

const courseRouter = require("express").Router();

//courseRouter
courseRouter.post(
  "/create",
  JWT_AUTH,
  isInstructor,
  // upload.single("image"),
  courseController.create
);
courseRouter.get("/lists", courseController.lists);
// Add more
courseRouter.get(
  "/private-lists",
  JWT_AUTH,
  isInstructor,
  courseController.lists
);

// Add more
// courseRouter.get(
//   "/:courseId",
//   JWT_AUTH,
//   isInstructor,
//   courseController.getCourseById
// );
// Add more
courseRouter.get("/:courseId", courseController.getCourseById);
//
courseRouter.put("/:courseId", JWT_AUTH, isInstructor, courseController.update);
courseRouter.delete(
  "/:courseId",
  JWT_AUTH,
  isInstructor,
  courseController.delete
);

//*************************** */
module.exports = courseRouter;
