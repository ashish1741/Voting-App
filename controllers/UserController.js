const bcrypt = require("bcrypt");
const { generatedToken } = require("../middlewares/JwtAuth");
const User = require("../model/user.js");

const UserSignUp = async (req, res) => {
  const { username, email, password, citizenShipNumber, address, age , role } =
    req.body;

  if (
    !username ||
    !email ||
    !password ||
    !citizenShipNumber ||
    !address ||
    !age 
  ) {
    return res.status(401).json({
      statusCode: 401,
      error: "please provide the required field",
    });
  }

  if (citizenShipNumber.length <= 7) {
    return res.status(401).json({
      statusCode: 401,
      error: "please enter the valid  citizenShipNumber",
    });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const data = {
      username,
      email,
      password: hashPassword,
      citizenShipNumber,
      address,
      age,
      role
    };

    const user = new User(data);
    const response = await user.save();
    const payload = {
      id: response.id,
    };

    const token = generatedToken(payload);

    res.status(200).json({
      statusCode: 200,
      user: response,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

//login api

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      statusCode: 401,
      err: "Please Provide the necessary information",
    });
  }

  try {
    const user = await User.findOne({ email: email });
    console.log(user);

    if (!user || user.length === 0) {
      return res.status(401).json({
        statusCode: 401,
        err: "please enter the valid email",
      });
    }

    const comaparePassword = await bcrypt.compare(password, user.password);

    if (!comaparePassword) {
      return res.status(401).json({
        statusCode: 401,
        err: "please enter the valid Password",
      });
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = generatedToken(payload);

    return res.status(200).json({
      statusCode: 200,
      message: "Login successful",
      user: user,
      token: token,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      statusCode: 500,
      error: "Internal server error",
    });
  }
};

//user profile

const getUserProfile = async (req, res) => {

  const userData =  req.userData
  console.log(userData);

  const userId = userData ? userData.id : null;

  if (!userId) {
    return res.status(401).json({
      statusCode: 401,
      error: "Please provide user ID",
    });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        error: "User not found",
      });
    }

    res.status(200).json({
      statusCode: 200,
      user: user,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      statusCode: 500,
      error: "Internal server error",
    });
  }
};


// update password 

const updatePassword =  async(req, res) => {

  const{oldPassword , newPassword} =  req.body;
  const id =  req.userData.id;

  if (!oldPassword || !newPassword) {
    return res.status(401).json({
      statusCode:401,
      err:"please provided required filed"
    })
    
  }

  try {
    const user =  await User.findById(id);

    const isOldPasswordCorrect = await bcrypt.compare(oldPassword , user.password);

    if (!isOldPasswordCorrect) {
      return res.status(401).json({
        statusCode:401,
        error:"please enter correct password"
      })
      
    }

    const hashPassword =  await bcrypt.hash(newPassword, 12);

    user.password = hashPassword;
    await user.save();

    return res.status(200).json({
      statusCode: 200,
      message: "password updated sucessfully",
      user: user,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      statusCode: 500,
      error: "Internal server error",
    });
  }
}


module.exports = { UserSignUp, userLogin, getUserProfile , updatePassword };
