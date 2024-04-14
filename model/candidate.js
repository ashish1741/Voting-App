const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  Party: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },

  vote : []
});

const candidate = mongoose.model("user", CandidateSchema);

module.exports = candidate;
