const Class = require("../models/Class");
const Quiz = require("../models/Quiz");

const createQuiz = async (req, res) => {
  const isInstructor = req.userData.isInstructor === "false" ? false : true;
  const { quizName, questions } = req.body;
  const { classId } = req.params;
  const { id } = req.userData;

  if (!isInstructor) {
    res.status(403).json({
      status: 403,
      message: "You must be an instructor to create a quiz.",
    });
  } else {
    const classData = await Class.findById({ _id: classId });

    if (classData.instructorId !== id) {
      res.status(403).json({
        status: 403,
        message: "You are not the instructor for this class.",
      });
    } else {
      const newQuiz = new Quiz({
        quizName,
        questions,
      });

      await newQuiz.save();
      classData.quizzes = [...classData.quizzes, newQuiz._id.toString()];
      await classData.save();

      res.status(201).json({
        status: 201,
        message: "Quiz created successfully.",
      });
    }
  }
};

module.exports = createQuiz;
