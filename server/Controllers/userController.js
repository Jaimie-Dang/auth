const UserModel = require("../Models/userModel");
const otp_generator = require("otp-generator");
const bcrypt = require("bcrypt");

//*********************************** */
const register = async (req, res) => {
  try {
    // console.log(req.body);

    // Check user: be existed or not!
    const isUserExisting = await UserModel.findOne({ email: req.body.email });

    if (isUserExisting) {
      return res
        .status(400)
        .json({ message: `User with ${req.body.email} already exists` });
    }

    // verificationToken
    const verificationToken = otp_generator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // Date
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5); // After 5 minuts, it will be expired

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    //-------------------------------------------
    const newUser = await UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      verificationToken: {
        token: verificationToken,
        expires: expires,
      },
    });

    console.log(newUser);

    // Save to DB: by newUser.save()
    await newUser.save();
    res.json({ message: "Save successfully" });
  } catch (error) {
    res.json(error);
  }
};

//*********************************** */
const login = async (req, res) => {
  try {
    console.log(req.body);
    res.json("success");
  } catch (error) {
    res.json(error);
  }
};

module.exports = { register, login };
