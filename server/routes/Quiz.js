const router = require("express").Router();
const { createQuiz, fetchQuiz } = require("../controllers/Quiz");

router.post("/create", createQuiz);
router.get("/:quizId", fetchQuiz);

module.exports = router;
