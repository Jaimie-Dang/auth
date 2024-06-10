const JWT_AUTH = require("../middleware/JWT_AUTH");
const express = require("express");
const courseSectionCtrl = require("../Controllers/courseSectionController");
const { isInstructor } = require("../middleware/roleAccessMiddleware");
const courseSectionRoute = require("express").Router();

// courseSectionRoute
courseSectionRoute.post(
  "/create/:courseId",
  JWT_AUTH,
  isInstructor,
  courseSectionCtrl.create
);
courseSectionRoute.get("/", courseSectionCtrl.lists);
courseSectionRoute.put(
  "/:sectionId",
  JWT_AUTH,
  isInstructor,
  courseSectionCtrl.update
);
courseSectionRoute.get("/:sectionId", courseSectionCtrl.getSection);
courseSectionRoute.delete(
  "/:sectionId",
  JWT_AUTH,
  isInstructor,
  courseSectionCtrl.delete
);

//*************************** */
module.exports = courseSectionRoute;
