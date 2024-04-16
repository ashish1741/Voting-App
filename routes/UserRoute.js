const express =  require("express");
const UserRouter =  express.Router();
const {UserSignUp, userLogin} = require("../controllers/UserController");


UserRouter.post("/signup" , UserSignUp);
UserRouter.post("/login" , userLogin)




module.exports =  UserRouter;










