require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jaimiedang02@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (to, subject, emailBody) => {
  let mailOptions = {
    to,
    from: "jaimiedang02@gmail.com",
    subject,
    html: emailBody,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(res);
        resolve(res);
      }
    });
  });
};

module.exports = sendMail;
