const asyncHandler = require("express-async-handler");
const {formatResponse} = require("./formatResponse");
const Article =require("../models/articleSchema")

//@desc get all articles
//@route GET api/articles
//@access private
const articles = asyncHandler (async (req, res) => {
  const articles = await Article.find().populate('author');
  const response = formatResponse(201, { articles }, null,  "All articles displayed");
  res.status(201).json(response);
   
});

module.exports = {
    articles:articles
 };
 