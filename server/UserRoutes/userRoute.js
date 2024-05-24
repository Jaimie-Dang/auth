const {
  register,
  login,
  verifyUser,
} = require("../Controllers/userController");

const router = require("express").Router();

//Router
router.post("/register", register);
router.post("/login", login);
router.get("/verify/:token", verifyUser);

//*************************** */
module.exports = router;
