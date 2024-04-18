const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Party: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },

  vote: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },

      votedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  voteCount: {
    type: Number,
    default: 0,
  },
});




const candidate = mongoose.model("Candidate", CandidateSchema);
module.exports = candidate;
