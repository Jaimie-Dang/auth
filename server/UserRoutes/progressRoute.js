const JWT_AUTH = require("../middleware/JWT_AUTH");
const express = require("express");

const progressController = require("../Controllers/progressController");
const { isStudent } = require("../middleware/roleAccessMiddleware");
const progressRouter = require("express").Router();

//courseRouter
progressRouter.post("/", JWT_AUTH, isStudent, progressController.appToCourse);
progressRouter.put(
  "/start-section",
  JWT_AUTH,
  isStudent,
  progressController.startSection
);
progressRouter.put("/update", JWT_AUTH, isStudent, progressController.update);

//*************************** */
module.exports = progressRouter;
