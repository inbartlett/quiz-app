const router = require("express").Router();
const User = require("../models/User");

router.post("/create", async (req, res) => {
  const { courseName, instructor } = req.body;

  const user = await User.findById({ _id: instructor });
  const classes = user.classes;

  User.findByIdAndUpdate(
    { _id: instructor },
    { classes: [...classes, { courseName }] },
    { new: true },
    (err, data) => {
      res.status(200).json({
        status: 200,
        classes: data.classes,
      });
    }
  );
});

module.exports = router;
