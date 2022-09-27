const User = require("../models/User");

const logoutUser = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken) {
    res.status(200).json({ status: 200, message: "You are not logged in." });
  } else {
    const { refreshToken } = cookies;

    const user = await User.findOne({ refreshToken });

    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "None",
        secure: true,
      });
      res.status(200).json({
        status: 200,
        message: "Token revoked",
      });
    } else {
      user.refreshToken = "";

      await user.save();

      res.clearCookie("refreshToken", {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "None",
        // secure: true,
      });

      res.status(200).json({
        status: 200,
        message: "Token revoked and removed from DB",
      });
    }
  }
};

module.exports = logoutUser;
