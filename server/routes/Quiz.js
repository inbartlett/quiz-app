const router = require("express").Router();
const Quiz = require("../models/Quiz");

router.post("/create", async (req, res) => {
  const { quizName, classId, questions } = req.body;

  const newQuiz = new Quiz({
    quizName,
    classId,
    questions,
  });

  await newQuiz.save();

  res.status(200).json({ status: 200, message: "Quiz created successfully." });
});

module.exports = router;
