require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtAuthMiddleWare = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({
      statusCode: 401,
      error: "Token not found",
    });
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      error: "unauthorized",
    });
  }

  try {
    const decoded =   jwt.verify(token, process.env.SECRETE_KEY);

     req.userData =  decoded;

    next();
  } catch (error) {
    res.status(401).json({
      statusCode: 401,
      error: "Invalid Token",
    });
  }
};


// 

// create jwt token 

const  generatedToken  = (userData , req ,  res , next) => {

    return jwt.sign(userData , process.env.SECRETE_KEY , {expiresIn:30000})

}




module.exports = {
    jwtAuthMiddleWare,
    generatedToken
}