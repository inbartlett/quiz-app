const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()
app.use(express.json())

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true}, () => {
  console.log("Connected to Database")
})

const userRoute = require("./routes/User")
app.use("/user", userRoute)

app.listen(8800, () => {
  console.log("Server running on port 8800")
})