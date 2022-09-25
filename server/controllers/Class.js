const Class = require("../models/Class");
const User = require("../models/User");

module.exports.createClass = async (req, res) => {
  const { courseName, instructorId, students } = req.body;

  const studentData = await User.find({
    email: { $in: [...students] },
  }).distinct("_id");

  let studentIds = [];
  for (let student of studentData) {
    studentIds.push(JSON.stringify(student).split('"').join(""));
  }

  const newClass = new Class({
    courseName,
    instructorId,
    students: studentIds,
  });

  await newClass.save();

  res.status(200).json({ status: 200, message: "Class created successfully." });
};

module.exports.getStudents = async (req, res) => {
  const { classId } = req.params;

  const students = await Class.findOne({ _id: classId }).distinct("students");

  const studentNames = await User.find(
    {
      _id: {
        $in: [...students],
      },
    },
    { _id: 0, firstName: 1, lastName: 1 }
  );

  res.status(200).json({ status: 200, students: studentNames });
};
