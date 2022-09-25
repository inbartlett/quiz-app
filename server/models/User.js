const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isInstructor: {
      type: Boolean,
      required: true,
    },
  },
  {
    collection: "users",
  }
);

module.exports = model("User", UserSchema);
