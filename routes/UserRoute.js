const express =  require("express");
const UserRouter =  express.Router();
const {UserSignUp, userLogin, getUserProfile, updatePassword} = require("../controllers/UserController");
const { jwtAuthMiddleWare } = require("../middlewares/JwtAuth");


UserRouter.post("/signup" , UserSignUp);
UserRouter.post("/login" , userLogin);
UserRouter.get("/getuser" , jwtAuthMiddleWare,  getUserProfile);
UserRouter.put("/passwordChange" , jwtAuthMiddleWare,  updatePassword);





module.exports =  UserRouter;










