const express =  require("express");
const VoteRouter =  express.Router();
const { jwtAuthMiddleWare } = require("../middlewares/JwtAuth");
const { VoteCount, VoteCandidate } = require("../controllers/VoteController");



VoteRouter.get("/vote/count" , VoteCount)
VoteRouter.post("/vote/:id" , jwtAuthMiddleWare ,  VoteCandidate)




module.exports =  VoteRouter;




