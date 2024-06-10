const UserModel = require("../Models/userModel");
// ! Role checking function

// ! Admin Role
const isAdmin = async (req, res, next) => {
  // Find the user in the DB
  const user = await UserModel.findById(req.decodedData.id);
  if (user.role !== "admin")
    return res.status(403).json({ message: "Access denied: Admin only" });
  next();
};

// ! Student Role
const isStudent = async (req, res, next) => {
  // Find the user in the DB
  const user = await UserModel.findById(req.decodedData.id);
  if (user.role !== "student")
    return res.status(403).json({ message: "Access denied: Student only" });
  next();
};

// ! Instructor Role
const isInstructor = async (req, res, next) => {
  // Find the user in the DB
  const user = await UserModel.findById(req.decodedData.id);
  if (user.role !== "instructor")
    return res.status(403).json({ message: "Access denied: Instructor only" });
  next();
};

module.exports = { isAdmin, isStudent, isInstructor };
