const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    res.status(401).json({
      status: 401,
      message: "An account with the provided email address does not exist.",
    });
  } else {
    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      res.status(401).json({
        status: 401,
        message: "Invalid password.",
      });
    } else {
      const { _id: id, email, isInstructor } = existingUser;
      const accessToken = jwt.sign({ id, email, isInstructor }, ACCESS_SECRET, {
        expiresIn: "15s",
      });
      const refreshToken = jwt.sign(
        { id, email, isInstructor },
        REFRESH_SECRET,
        {
          expiresIn: "30s",
        }
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "None",
        // secure: true,
      });

      existingUser.refreshToken = refreshToken;

      await existingUser.save();

      res.status(202).json({
        status: 202,
        message: "Logged in successfully.",
        accessToken,
      });
    }
  }
};

module.exports = loginUser;
