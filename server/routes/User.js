const router = require("express").Router();
const registerUser = require("../controllers/registerUser");
const loginUser = require("../controllers/loginUser");
const logoutUser = require("../controllers/logoutUser");
const refreshToken = require("../controllers/refreshToken");
const fetchClasses = require("../controllers/fetchClasses");
const verifyToken = require("../middlewares/verifyToken");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/refresh", refreshToken);
router.get("/logout", verifyToken, logoutUser);
router.get("/:userId/classes", verifyToken, fetchClasses);

module.exports = router;
