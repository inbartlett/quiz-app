const { Schema, model } = require("mongoose");

const ClassSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    instructorId: {
      type: String,
      required: true,
    },
    students: {
      type: Array,
      default: [],
    },
    quizzes: {
      type: Array,
      default: [],
    },
  },
  {
    collection: "classes",
  }
);

module.exports = model("Class", ClassSchema);
