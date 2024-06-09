const JWT_AUTH = require("../middleware/JWT_AUTH");
const express = require("express");
const courseController = require("../Controllers/courseController");

const courseRouter = require("express").Router();

//courseRouter
courseRouter.post("/create", JWT_AUTH, courseController.create);
courseRouter.get("/lists", courseController.lists);
courseRouter.get("/:courseId", courseController.getCourseById);
courseRouter.put("/:courseId", courseController.update);
courseRouter.delete("/:courseId", courseController.delete);

//*************************** */
module.exports = courseRouter;