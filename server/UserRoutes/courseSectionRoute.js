const JWT_AUTH = require("../middleware/JWT_AUTH");
const express = require("express");
const courseSectionCtrl = require("../Controllers/courseSectionController");

const courseSectionRoute = require("express").Router();

// courseSectionRoute
courseSectionRoute.post(
  "/create/:courseId",
  JWT_AUTH,
  courseSectionCtrl.create
);
courseSectionRoute.get("/", courseSectionCtrl.lists);
courseSectionRoute.put("/:sectionId", JWT_AUTH, courseSectionCtrl.update);
courseSectionRoute.put("/:sectionId", courseSectionCtrl.update);
courseSectionRoute.delete("/:sectionId", JWT_AUTH, courseSectionCtrl.delete);

//*************************** */
module.exports = courseSectionRoute;
