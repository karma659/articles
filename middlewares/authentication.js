const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {formatResponse} = require("../Controllers/formatResponse");

const verifyToken =  (req, res, next) => {
 
   const authHeader = req.headers["Authorization"] || req.headers['authorization']; 
   const token = authHeader && authHeader.split(' ')[1] ;
   console.log(`token : ${token}`);

   if (token == null) {
      const response = formatResponse(403, { token:token }, "Conflict", "A token is required for authentication");
      return   res.status(403).json(response);
   }

   try {
   const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECERT);
   console.log(decoded);
   req.user = decoded;
   next();

} catch (err) {
   const response = formatResponse(498, {  }, 'Invalid token','Invalid token');
   return   res.status(498).json(response);  
 }
};

module.exports = {
   verifyToken: verifyToken
};
