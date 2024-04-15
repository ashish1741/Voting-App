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

  vote: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
      },

      votedAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  voteCount: {
    type: Number,
    default: 0,
  },
});



const candidate = mongoose.model("user", CandidateSchema);
module.exports = candidate;
