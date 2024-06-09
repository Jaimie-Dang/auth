const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSectionSchema = new mongoose.Schema(
  {
    sectionName: {
      type: String,
      required: true,
    },

    // !Catious
    sectionsCompleted: [
      {
        type: Schema.Types.ObjectId,
        ref: "CourseSection",
      },
    ],

    estimatedTime: Number,
    isCompleted: { type: Boolean, default: false },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

// Compile to form the model
const CourseSectionModel = mongoose.model("CourseSection", courseSectionSchema);
module.exports = CourseSectionModel;
