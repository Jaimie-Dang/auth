const {
  register,
  login,
  verifyUser,
  resend_Verification,
} = require("../Controllers/userController");

const router = require("express").Router();

//Router
router.post("/register", register);
router.post("/login", login);
router.get("/verify/:token", verifyUser);
router.get("/resend_Verification/:token", resend_Verification);

//*************************** */
module.exports = router;
