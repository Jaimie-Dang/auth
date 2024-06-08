const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    OTP_VerificationToken: {
      OTP: String,
      expires: Date,
    },
    verificationToken: {
      token: String,
      expires: Date,
    },
    // role
    role: {
      type: String,
      enum: ["admin", "instructor", "student"],
      default: "student",
    },
    // progress
    progress: [
      {
        courseId: {
          type: Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
        sections: [
          {
            sectionId: {
              type: Schema.Types.ObjectId,
              ref: "CourseSection",
              required: true,
            },
            status: {
              type: String,
              enum: ["Not Started", "In Progress", "Completed"],
              default: "Not Started",
            },
          },
        ],
      },
    ],
    coursesCreated: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    coursesApplied: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    lastLogin: Date,
  },
  {
    timestamps: true,
  }
);

// Compile to form the model
const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;
