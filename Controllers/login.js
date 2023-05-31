const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {formatResponse} = require("./formatResponse");

//@desc Login user
//@route POST /api/login
//@access public
const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
    const response = formatResponse(400, {  } , "Bad Request", "All fields are mandatory!");
    res.status(400).json(response);
    throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({ email });
    //compare password with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECERT, { expiresIn: "35m" } );
      console.log(`userId: ${user._id}`);
      console.log(`Token: ${accessToken}`);
      res.setHeader('Authorization', `Bearer ${accessToken}`);
      const response = formatResponse(200, { Token:accessToken}, null,  "User successfully logged in !");
      res.status(200).json(response);
    } else {

      const response = formatResponse(400, { } , "Unauthorized", "Invalid email or password");
      res.status(400).json(response);
      throw new Error("email or password is not valid");
    }
  });
  
module.exports = {
  login:login
};
