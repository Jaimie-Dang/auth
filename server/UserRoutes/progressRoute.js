const JWT_AUTH = require("../middleware/JWT_AUTH");
const express = require("express");

const progressController = require("../Controllers/progressController");
const progressRouter = require("express").Router();

//courseRouter
progressRouter.post("/", JWT_AUTH, progressController.appToCourse);
progressRouter.put("/start-section", JWT_AUTH, progressController.startSection);
progressRouter.put("/update", JWT_AUTH, progressController.update);

//*************************** */
module.exports = progressRouter;
