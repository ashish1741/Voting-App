const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    age: Number,
  },
  email: {
    type: String,
    require: true,
    unqiue: true,
  },
  mobile: {
    type: String,
  },

  address: {
    type: String,
    require: true,
  },
  citizenShipNumber: {
    type: String,
    require: true,
    unqiue: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["voter", "admin"],
    default: "voter",
  },

  isVoted: {
    type: Boolean,
    default: false,
  },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
