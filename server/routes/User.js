const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById({ _id: userId });

  if (user) {
    res.status(200).json({ status: 200, classes: user.classes });
  } else {
    res.status(400).json({ status: 400, message: "User does not exist" });
  }
});

router.post("/register", async (req, res) => {
  const { username, email, password, isInstructor } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isInstructor,
    });

    await newUser.save();

    res.status(200).json({
      status: 200,
      message: "Account created successfully.",
    });
  } else {
    res.status(409).json({ status: 409, message: "Account already exists." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      res.status(200).json({ status: 200, user });
    } else {
      res.status(401).json({ status: 401, message: "Invalid password." });
    }
  }
});

module.exports = router;
