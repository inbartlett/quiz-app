const router = require("express").Router();
const createClass = require("../controllers/createClass");
const fetchQuizzes = require("../controllers/fetchQuizzes");
const verifyToken = require("../middlewares/verifyToken");

router.post("/create", verifyToken, createClass);
router.get("/:classId/quizzes", verifyToken, fetchQuizzes);

module.exports = router;
