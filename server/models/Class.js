const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    students: {
      type: Array,
      default: [],
    },
  },
  {
    collection: "classes",
  }
);

module.exports = mongoose.model("Class", ClassSchema);
