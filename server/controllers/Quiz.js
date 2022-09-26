const Class = require("../models/Class");
const Quiz = require("../models/Quiz");

module.exports.createQuiz = async (req, res) => {
  const { quizName, classId, questions } = req.body;

  const newQuiz = new Quiz({
    quizName,
    classId,
    questions,
  });

  await newQuiz.save();

  const quizzes = await Class.find({ _id: classId }).distinct("quizzes");
  const newQuizId = JSON.stringify(newQuiz._id).split('"').join("");

  await Class.findOneAndUpdate(
    { _id: classId },
    { quizzes: [...quizzes, { id: newQuizId, quizName }] }
  );

  res.status(200).json({ status: 200, message: "Quiz created successfully." });
};

module.exports.fetchQuiz = async (req, res) => {
  const { quizId } = req.params;

  const quiz = await Quiz.findOne({ _id: quizId });

  res.status(200).json({ status: 200, quiz });
};
