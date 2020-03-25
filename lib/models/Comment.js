const mongoose = require('mongoose');
const { getRandomQuote } = require('../services');

const commentSchema = new mongoose.Schema({
  tweetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
    required: true
  },
  handle: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

commentSchema.pre('validate', async function(next) {
  if(this.text.length) return next();
  this.text = await getRandomQuote();
  next();
});

module.exports = mongoose.model('Comment', commentSchema);
