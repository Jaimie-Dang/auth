const UserModel = require("../Models/userModel");
const otp_generator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// to send mail to user (dich vu gui mail)
const sendEmail = require("../EmailService/Email");

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
    await sendEmail(req.body.email, subject, emailBody);

    // response
    res.json({ message: "Verfication link sent to your email." });
  } catch (error) {
    res.json({ message: "Something went wrong" });
  }
};

//*********************************** */
const login = async (req, res) => {
  try {
    console.log(req.body);
    // Check user: be existed or not!
    const isUserExisting = await UserModel.findOne({ email: req.body.email });

    console.log(isUserExisting);
    if (!isUserExisting) {
      return res
        .status(400)
        .json({ message: `User with ${req.body.email} don't exists` });
    }

    if (!isUserExisting.isVerified) {
      return res.status(400).json({
        message: `User is not verified. Please click the link in your email to verify`,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      isUserExisting.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: `password is not corrected. Please enter again`,
      });
    }

    // create a jwt
    const jwtPayload = {
      _id: isUserExisting._id,
    };

    const token = jwt.sign(jwtPayload, process.env.SECRET, {
      expiresIn: "1m",
    });
    console.log(token);

    res.json({
      message: `User Logged in successfully`,
      token,
    });
  } catch (error) {
    res.json({
      message: `Something went wrong`,
    });
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
      return res.send(
        `<p>Token Invalid or Expired.</p> <a href="http://localhost:5000/user/resend_Verification/${token}">Resend Verification Mail</a>`
      );
    }

    if (isTokenValid.isVerified) {
      return res.send("Account already verified successfully. Please Login");
    }

    isTokenValid.isVerified = true;

    await isTokenValid.save();

    res.send("Account verified successfully");
  } catch (error) {
    console.log(error);
  }
};

const resend_Verification = async (req, res) => {
  try {
    const { token } = req.params;
    //
    const user = await UserModel.findOne({
      "verificationToken.token": token,
      //Sửa ở đây false -> true
      isVerified: false,
    });
    console.log("Test--------------");
    console.log(user.isVerified);
    //

    const verificationToken = otp_generator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // Date
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5); // After 5 minuts, it will be expired

    //-------------------------------------------
    user.verificationToken = {
      token: verificationToken,
      expires: expires,
    };
    // Save to DB: by newUser.save()
    await user.save();
    console.log("Test--------------");
    console.log(verificationToken, expires);

    // send mail to user with register
    const emailBody = `<p>Please click on the link to verify your account. <b>http://localhost:5000/user/verify/${verificationToken}</b></p>`;
    const subject = `Verification Email`;
    await sendEmail(user.email, subject, emailBody);

    res.send("Please check your email for a new verification link");
  } catch (error) {
    res.send("Something went wrong!");
    console.log(error);
  }
};

//******************************************************************* */
module.exports = { register, login, verifyUser, resend_Verification };
