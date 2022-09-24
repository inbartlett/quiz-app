const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
  {
    quizName: {
      type: String,
      required: true,
    },
    classId: {
      type: String,
      required: true,
    },
    questions: {
      type: Array,
      required: true,
    },
  },
  {
    collection: "quizzes",
  }
);

module.exports = mongoose.model("Quiz", QuizSchema);
