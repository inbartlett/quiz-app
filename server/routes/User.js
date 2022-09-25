const router = require("express").Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getClasses,
} = require("../controllers/User");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/:userId/classes", getClasses);

module.exports = router;
