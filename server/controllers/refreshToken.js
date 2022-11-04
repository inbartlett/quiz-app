const User = require("../models/User");
const jwt = require("jsonwebtoken");
const ACCESS = process.env.ACCESS_TOKEN_SECRET;
const REFRESH = process.env.REFRESH_TOKEN_SECRET;

const refreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken) {
    res.status(401).json({ status: 401, message: "Please login to continue." });
  } else {
    const { refreshToken } = cookies;

    const user = await User.findOne({ refreshToken });

    if (!user) {
      res.status(403).json({
        status: 403,
        message: "Please login to continue.",
      });
    } else {
      jwt.verify(refreshToken, REFRESH, (err, token) => {
        if (err || user.email !== token.email) {
          console.log("Refresh expired");
          res.status(406).json({
            status: 406,
            message: "Expired/Malformed token detected.",
          });
        } else {
          const accessToken = jwt.sign(
            { id: user._id, email: token.email },
            ACCESS,
            {
              expiresIn: "10s",
            }
          );

          res.status(201).json({ status: 201, accessToken });
        }
      });
    }
  }
};

module.exports = refreshToken;
