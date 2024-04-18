const candidate = require("../model/candidate");
const Candidate = require("../model/candidate");
const User = require("../model/user");

//function to check either user is candidate or not
const isAdmin = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user.role === "admin";
  } catch {
    return false;
  }
};

//creating a candidate
const createCandidate = async (req, res) => {
  try {
    if (! await isAdmin(req.userData.id)) {
      return res.status(401).json({
        statusCode: 401,
        err: "user has not admin role",
      });
    }

    const data = req.body;
    const newCandidate = new Candidate(data);
    const response = await newCandidate.save();

    res.status(200).json({
      response: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      err: "Internal Sever Error",
    });
  }
};

//get candidate Id
const UpdateCandidateId = async (req, res) => {
  try {
    console.log('Entering try block');
    
    // Check if user is admin
    if (!await isAdmin(req.userData.id)) {
      return res.status(401).json({
        statusCode: 401,
        err: "User does not have admin role",
      });
    }

    console.log(`User is admin, proceeding`);

    const candidateId = req.params.id || null;

    const updateCandidateData = req.body;

    
    const response = await Candidate.findByIdAndUpdate(
      candidateId,
      updateCandidateData,
      {
        new: true,  
        runValidators: true,  
      }
    );

   
    if (!response) {
      return res.status(404).json({
        statusCode: 404,
        err: "Candidate not found",
      });
    }

   
    res.status(200).json({
      statusCode: 200,
      response: response,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      statusCode: 500,
      err: "Internal Server Error",
    });
  }
};


// deleted candidate

const deleteCandidate = async (req, res) => {
  try {
    // Check if user is an admin
    if (!isAdmin(req.userData.id)) {
      return res.status(401).json({
        statusCode: 401,
        err: "User does not have admin role",
      });
    }

    // Extract candidate ID from request parameters
    const candidateId = req.params.id || null;

    // Delete candidate from the database
    const response = await candidate.findByIdAndDelete(candidateId);

    // Check if candidate was found and deleted
    if (!response) {
      return res.status(404).json({
        statusCode: 404,
        err: "Candidate not found",
      });
    }

    // Send successful response
    res.status(200).json({
      statusCode: 200,
      message: "Candidate deleted successfully",
    });
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error("Error:", error);
    res.status(500).json({
      statusCode: 500,
      err: "Internal Server Error",
    });
  }
};


//
module.exports = { createCandidate, UpdateCandidateId , deleteCandidate };
