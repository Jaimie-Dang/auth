const JWT_AUTH = require("../middleware/JWT_AUTH");
const express = require("express");

const progressController = require("../Controllers/progressController");
const progressRouter = require("express").Router();

//courseRouter
progressRouter.post("/", JWT_AUTH, progressController.appToCourse);

//*************************** */
module.exports = progressRouter;
