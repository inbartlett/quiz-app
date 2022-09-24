const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    classes: {
      type: Array,
      default: [],
    },
    isInstructor: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("User", UserSchema);
