const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect(process.env.DB_URL, (error) => {
  if (error) console.log("Unable to connect to database.");
  else console.log("Successfully connect to database.");
});

const userRoute = require("./routes/User");
app.use("/user", userRoute);

const classRoute = require("./routes/Class");
app.use("/class", classRoute);

const quizRoute = require("./routes/Quiz");
app.use("/quiz", quizRoute);

app.listen(8800, () => {
  console.log("Server running at: http://localhost:8800");
});
