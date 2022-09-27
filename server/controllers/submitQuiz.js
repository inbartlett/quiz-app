const Answers = require("../models/Answers");
const Class = require("../models/Class");

const submitQuiz = async (req, res) => {
  const { answers } = req.body;
  const { quizId, classId } = req.params;
  const { id: userId } = req.userData;

  const classData = await Class.findById({ _id: classId });

  if (!classData.students.includes(userId) && !isInstructor) {
    res.status(403).json({
      status: 403,
      message: "You are not in this class.",
    });
  } else {
    const quizData = await Answers.findOne({ quizId, userId });

    if (!quizData.length) {
      res.status(403).json({
        status: 403,
        message: "You have already taken this quiz.",
      });
    } else {
      const newAnswers = new Answers({
        userId,
        quizId,
        answers,
      });

      await newAnswers.save();

      res.status(201).json({
        status: 201,
        message: "Quiz submitted successfully.",
      });
    }
  }
};

module.exports = submitQuiz;
