const { Schema, model } = require("mongoose");

const QuizSchema = new Schema(
  {
    quizName: {
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

module.exports = model("Quiz", QuizSchema);
