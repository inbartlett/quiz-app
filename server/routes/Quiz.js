const router = require("express").Router();
const { createQuiz } = require("../controllers/Quiz");

router.post("/create", createQuiz);

module.exports = router;
