const router = require("express").Router();
const Class = require("../models/Class");

router.post("/create", async (req, res) => {
  const { courseName, instructor } = req.body;

  const newClass = new Class({
    courseName,
    instructor,
  });

  await newClass.save();

  res.status(200).json({ status: 200, message: "Class created successfully." });
});

module.exports = router;
