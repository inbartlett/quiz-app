const User = require("../models/User");
const bcrypt = require("bcrypt");
const HASH = parseInt(process.env.HASH);

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, isInstructor } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(409).json({
      status: 409,
      message: "An account with the provided email address already exists.",
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, HASH);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isInstructor,
    });

    await newUser.save();

    res.status(201).json({
      status: 201,
      message: "Account created successfully.",
    });
  }
};

module.exports = registerUser;
