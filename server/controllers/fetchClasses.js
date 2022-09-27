const Class = require("../models/Class");

const fetchClasses = async (req, res) => {
  const { id } = req.userData;
  const { userId } = req.params;

  if (id !== userId) {
    res.status(401).json({
      status: 401,
      message: "You cannot view this user's classes.",
    });
  } else {
    const classes = await Class.find(
      {
        students: { $in: userId },
      },
      { _id: 1, courseName: 1 }
    );

    res.status(200).json({ status: 200, classes });
  }
};

module.exports = fetchClasses;
