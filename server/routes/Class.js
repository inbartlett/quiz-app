const router = require("express").Router();
const {
  createClass,
  getStudents,
  getQuizzes,
} = require("../controllers/Class");

router.post("/create", createClass);
router.get("/:classId/students", getStudents);
router.get("/:classId/quizzes", getQuizzes);

module.exports = router;
