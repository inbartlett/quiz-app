const Class = require("../models/Class");
const User = require("../models/User");

const createClass = async (req, res) => {
  const isInstructor = req.userData.isInstructor === "false" ? false : true;

  if (!isInstructor) {
    res.status(403).json({
      status: 403,
      message: "You must be an instructor to create a class.",
    });
  } else {
    const { courseName, students = [] } = req.body;
    const { id: instructorId } = req.userData;

    const studentIds = await User.find({
      email: { $in: [...students] },
    }).distinct("_id");

    const newClass = new Class({
      courseName,
      instructorId,
      students: [instructorId, ...studentIds.toString().split(",")],
    });

    await newClass.save();

    res.status(201).json({
      status: 201,
      class: {
        _id: newClass._id,
        courseName: newClass.courseName,
      },
    });
  }
};

module.exports = createClass;
