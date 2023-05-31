const mongoose = require("mongoose");
const User = require("./user");

const articleSchema =  mongoose.Schema({
  title: { type: String, required: true ,  unique: true },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Article', articleSchema);



