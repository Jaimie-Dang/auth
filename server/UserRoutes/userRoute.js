const {
  register,
  login,
  verifyUser,
  resend_Verification,
  updateUser,
  forgotPassword,
  verifyPasswordOTP,
  getUser,
  lists,
  studentDashboard,
  privateProfile,
  listUser,
} = require("../Controllers/userController");
const JWT_AUTH = require("../middleware/JWT_AUTH");
const { isAdmin, isInstructor } = require("../middleware/roleAccessMiddleware");

const router = require("express").Router();

//Router
router.post("/register", register);
router.post("/login", login);
//
router.put("/updateUser", JWT_AUTH, updateUser);
//
router.get("/verify/:token", verifyUser);
router.get("/resend_Verification/:token", resend_Verification);

router.post("/resetPassword", forgotPassword);
router.post("/verifyPasswordOTP", verifyPasswordOTP);

router.get("/", JWT_AUTH, getUser);
// ! Public Profile
router.get("/student-dashboard", JWT_AUTH, studentDashboard);
// ! Private Profile
router.get("/private-profile", JWT_AUTH, privateProfile);
// ! Related to Course
router.get("/position/:courseId", lists);
router.get("/listUser", listUser);

//*************************** */
module.exports = router;
