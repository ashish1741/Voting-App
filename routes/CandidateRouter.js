const express = require("express");
const candidateRouter = express.Router();
const { jwtAuthMiddleWare } = require("../middlewares/JwtAuth");
const {
  createCandidate,
  UpdateCandidateId,
  deleteCandidate,
} = require("../controllers/CandidateController");

//candidate route
candidateRouter.post("/createCandidate", jwtAuthMiddleWare, createCandidate);
candidateRouter.put("/candidate/:id", jwtAuthMiddleWare, UpdateCandidateId);
candidateRouter.delete("/candidate/:id", jwtAuthMiddleWare, deleteCandidate);

module.exports = candidateRouter;
