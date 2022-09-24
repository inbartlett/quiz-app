const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, () => {
  console.log("Connected to Database");
});

const userRoute = require("./routes/User");
app.use("/user", userRoute);

const classRoute = require("./routes/Class");
app.use("/class", classRoute);

const quizRoute = require("./routes/Quiz");
app.use("/quiz", quizRoute);

app.listen(8800, () => {
  console.log("Server running on port 8800");
});
