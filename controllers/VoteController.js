const User = require("../model/user");
const Candidate = require("../model/candidate");

//vote a candidate

const VoteCandidate = async (req, res) => {
  try {
    const candidateId = req.params.id || null;
    const userId = req.userData.id;

    //find candidate documents with specified candidateId

    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({ error: "Candidate Not Found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "user Not Found" });
    }

    if (user.isVoted) {
      return res.status(400).json({ error: "user already Voted" });
    }

    if (user.role === "admin") {
      return res.status(400).json({ error: "Admin  Doesn't Allowed To  Vote" });
    }


    //update candidate document
    candidate.vote.push({ user: userId });
    Candidate.voteCount++;
    await candidate.save();

    //update user documents
    user.isVoted = true;
    await user.save();

    res.status(200).json({
      statusCode: 200,
      msg: "Vote Recorded Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      err: "Internal Server Error",
    });
  }
};

//vote count

const VoteCount = async (req, res) => {
    try {
      // Fetch candidates sorted by vote count in descending order
      const candidates = await Candidate.find().sort({ voteCount: 'desc' });

   
      
  
      // Map the candidates to extract required data
      const voteRecords = candidates.map((candidate) => {
        return {
          PartyName: candidate.Party,
          voteCount: candidate.voteCount,
        };
      });
  
      // Send the extracted data in the response
      res.status(200).json({
        statusCode: 200,
        count: voteRecords,
      });
    } catch (error) {
      // Handle errors
      console.error("Error in VoteCount:", error);
      res.status(500).json({
        statusCode: 500,
        err: "Internal Server Error",
      });
    }
  };
  

module.exports = {
  VoteCandidate,
  VoteCount,
};
