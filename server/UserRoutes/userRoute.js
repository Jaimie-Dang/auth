const {
  register,
  login,
  verifyUser,
  resend_Verification,
  updateUser,
  forgotPassword,
} = require("../Controllers/userController");
const JWT_AUTH = require("../middleware/JWT_AUTH");

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

//*************************** */
module.exports = router;
