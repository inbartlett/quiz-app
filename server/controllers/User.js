const User = require("../models/User");
const Class = require("../models/Class");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, isInstructor } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(409).json({
      status: 409,
      message: "An account with the provided email already exists.",
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isInstructor,
    });

    await newUser.save();

    res.status(200).json({
      status: 200,
      message: "Account created successfully.",
    });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    res.status(404).json({
      status: 404,
      message: "An account with the provided email does not exist.",
    });
  } else {
    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      res.status(406).json({
        status: 406,
        message: "Invalid password.",
      });
    } else {
      const userData = {
        id: existingUser._id,
        displayName: `${existingUser.firstName} ${existingUser.lastName}`,
      };
      const accessToken = jwt.sign(userData, process.env.JWT_SECRET);

      res.cookie("accessToken", accessToken, { httpOnly: true });

      res.status(200).json({
        status: 200,
        user: userData,
      });
    }
  }
};

module.exports.logoutUser = async (req, res) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    res.status(406).json({ status: 406, message: "You are not logged in." });
  } else {
    jwt.verify(accessToken, process.env.JWT_SECRET, (error) => {
      if (error) {
        res.status(406).json({
          status: 406,
          message: "Malformed access token detected.",
        });
      } else {
        res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 0 });
        res.status(200).json({
          status: 200,
          message: "Logged out successfully.",
        });
      }
    });
  }
};

module.exports.getClasses = async (req, res) => {
  const { userId } = req.params;

  const classes = await Class.find(
    { students: { $in: [userId] } },
    { _id: 1, courseName: 1 }
  );

  res.status(200).json({ status: 200, classes });
};
