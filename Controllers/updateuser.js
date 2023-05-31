const asyncHandler = require("express-async-handler");
const {formatResponse} = require("./formatResponse");
const User = require("../models/user");


const updateuser = asyncHandler (async (req, res) => {
  
    const { name, age } = req.body;
    // Check if user is authorized
    if (req.user.userId !== req.params.userId) {
      const response = formatResponse(403, {  }, null, "Not authorized" );
      res.status(403).json(response);
      throw new Error("Not authorized" );
    }
    // Update user profile
    const user = await User.findByIdAndUpdate(req.params.userId, { name, age });
    const response = formatResponse(200, {user}, null , 'User profile updated successfully' );
    res.status(200).json(response);

});

module.exports = {
    updateuser:updateuser
 };
 