const router = require("express").Router();
const { createClass, getStudents } = require("../controllers/Class");

router.post("/create", createClass);
router.get("/:classId/students", getStudents);

module.exports = router;
