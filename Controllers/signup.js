const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const {formatResponse} = require("./formatResponse");
const mongoose = require("mongoose");
//@desc Register a user
//@route POST /api/signup
//@access public
const signup = asyncHandler (async (req, res) => {
  
  const { name , email, password , age } = req.body;
  if (!name || !email || !password || !age) {
   
    const response = formatResponse(400, {  } , "Bad Request", "All fields are mandatory!");
    res.status(400).json(response);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    const response = formatResponse(409, { email }, "Conflict", "User already registered!");
    res.status(409).json(response);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);

  const user = new User({ email, password: hashedPassword, name, age });
  await user.save();

    console.log(`User created ${user}`);
    const response = formatResponse(201, { user }, null,  "User  registered Successfully !");
    res.status(201).json(response);
   
});

module.exports = {
    signup: signup
 };
 