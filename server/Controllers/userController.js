const UserModel = require("../Models/userModel");
const otp_generator = require("otp-generator");
const bcrypt = require("bcrypt");

// to send mail to user (dich vu gui mail)
const sendMail = require("../EmailService/Email");

//*********************************** */
const register = async (req, res) => {
  try {
    console.log(req.body);

    // Check user: be existed or not!
    const isUserExisting = await UserModel.findOne({ email: req.body.email });

    if (isUserExisting) {
      console.log("User already exists");
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

    // send mail to user with register
    const emailBody = `<p>Please click on the link to verify your account. <b>http://localhost:5000/user/verify/${verificationToken}</b></p>`;
    const subject = `Verification Email`;
    await sendMail(req.body.email, subject, emailBody);

    // response
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

//*********************************** */
const verifyUser = async (req, res) => {
  try {
    console.log(req.params);

    const { token } = req.params;

    const isTokenValid = await UserModel.findOne({
      "verificationToken.token": token,
      "verificationToken.expires": { $gt: new Date() },
    });

    console.log(isTokenValid);

    if (!isTokenValid) {
      return res.status(400).json({ message: "Token invalid or expired" });
    }

    isTokenValid.isVerified = true;

    await isTokenValid.save();

    res.send("Account verified successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login, verifyUser };
