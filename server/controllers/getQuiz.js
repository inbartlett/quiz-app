const Class = require("../models/Class");
const Quiz = require("../models/Quiz");

const getQuiz = async (req, res) => {
  const { classId, quizId } = req.params;
  const { id } = req.userData;
  const isInstructor = req.userData.isInstructor === "false" ? false : true;

  const classData = await Class.findById({ _id: classId });

  if (!classData.students.includes(id) && !isInstructor) {
    res.status(403).json({
      status: 403,
      message: "You are not in this class.",
    });
  } else {
    const quiz = await Quiz.findById({ _id: quizId });

    res.status(200).json({
      status: 200,
      quiz,
    });
  }
};

module.exports = getQuiz;
