const jwt = require("jsonwebtoken");
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(401).json({ status: 401, message: "Please login to continue." });
  } else {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, ACCESS_SECRET, (err, token) => {
      if (err) {
        res.status(406).json({
          status: 406,
          message: "Expired/Malformed token detected.",
        });
      } else {
        const userData = {
          id: token.id,
          email: token.email,
          isInstructor: token.isInstructor,
        };
        req.userData = userData;
        next();
      }
    });
  }
};

module.exports = verifyToken;
