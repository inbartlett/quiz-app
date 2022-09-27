const router = require("express").Router();
const createQuiz = require("../controllers/createQuiz");
const getQuiz = require("../controllers/getQuiz");
const verifyToken = require("../middlewares/verifyToken");
const submitQuiz = require("../controllers/submitQuiz");

router.post("/:classId/create", verifyToken, createQuiz);
router.get("/:classId/:quizId", verifyToken, getQuiz);
router.post("/:classId/:quizId/submit", verifyToken, submitQuiz);

module.exports = router;
