const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
dotenv.config();

const userRoute = require("./routes/User");
app.use("/api/users", userRoute);

const classRoute = require("./routes/Class");
app.use("/api/classes", classRoute);

const quizRoute = require("./routes/Quiz");
app.use("/api/quizzes", quizRoute);

const DB_URL = process.env.MONGO_URL;
mongoose.connect(DB_URL, (err) => {
  if (err) console.log("Unable to connect to database.");
  else console.log("Successfully connected to database.");
});

const PORT = process.env.SERVER_PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
