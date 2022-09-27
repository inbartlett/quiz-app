const Class = require("../models/Class");
const Quiz = require("../models/Quiz");

const fetchQuizzes = async (req, res) => {
  const { id } = req.userData;
  const { classId } = req.params;
  const isInstructor = req.userData.isInstructor === "false" ? false : true;

  const classData = await Class.findById({ _id: classId });
  const quizzes = await Quiz.find(
    { _id: { $in: [...classData.quizzes] } },
    { _id: 1, quizName: 1 }
  );

  if (!classData.students.includes(id) && !isInstructor) {
    res.status(403).json({
      status: 403,
      message: "You are not in this class.",
    });
  } else {
    res.status(200).json({
      status: 200,
      quizzes,
    });
  }
};

module.exports = fetchQuizzes;
