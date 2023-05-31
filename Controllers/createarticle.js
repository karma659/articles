const asyncHandler = require("express-async-handler");
 const Article =require("../models/articleSchema")
 const {formatResponse} = require("./formatResponse");

//@desc get create an Article
//@route POST api/users/:userId/articles
//@access private
const createarticle = asyncHandler (async (req, res) => {
        const { title, description } = req.body;
        // Validate request inputs
        if (!title || !description) {
          const response = formatResponse(400, {  }, "Bad Request", "Title and description are required");
          res.status(400).json(response);
          throw new Error("Title and description are required");
        }
        // Check if user is authorized
        if (req.user.userId !== req.params.userId) {
           const response = formatResponse(403, {  }, null, "Not authorized" );
           res.status(403).json(response);
           throw new Error("Not authorized" );
        }
        //check if already present the article
        const present = await Article.findOne({ title });
        if (present) {
          const response = formatResponse(409, { title }, "Conflict", "Article already present");
          res.status(409).json(response);
          throw new Error("Article already present");
        }
        // Create new article
        const newArticle = new Article({ title, description, author: req.user.userId });
        await newArticle.save();
        const response = formatResponse(201, { newArticle }, null,   "Article created successfully");
        res.status(201).json(response);
     
  });
  
 
  module.exports = {
      createarticle:createarticle,
   };
   