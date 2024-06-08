const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      required: true,
    },
    duration: { type: String, required: true },

    sections: [{ type: Schema.Types.ObjectId, ref: "CourseSection" }],
    user: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    students: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
  {
    timestamps: true,
  }
);

// Compile to form the model
const CourseModel = mongoose.model("Course", courseSchema);
module.exports = CourseModel;
