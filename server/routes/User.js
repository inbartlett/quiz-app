const router = require("express").Router()
const User = require("../models/User")

router.post("/", async (req, res) => {
  const { username, email, password } = req.body

  const newUser = await new User({
    username,
    email,
    password
  }) 

  await newUser.save()

  res.status(200).json(newUser)
})

module.exports = router;