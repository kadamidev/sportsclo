const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    maxLength: [32, "Username can not be more than 32 characters long"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    unique: false,
    trim: false,
    maxLength: [256, "Password can not be more than 256 characters long"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.models.User || mongoose.model("User", UserSchema)
