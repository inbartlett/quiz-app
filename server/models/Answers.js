const { Schema, model } = require("mongoose");

const AnswersSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    quizId: {
      type: String,
      required: true,
    },
    answers: {
      type: Array,
      required: true,
    },
  },
  {
    collection: "answers",
  }
);

module.exports = model("Answers", AnswersSchema);
