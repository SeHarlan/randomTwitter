const mongoose = require('mongoose');
const { getRandomQuote } = require('../services');

const tweetSchema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

tweetSchema.pre('validate', async function(next) {
  if(this.text.length) return next();
  this.text = await getRandomQuote();
  next();
});

module.exports = mongoose.model('Tweet', tweetSchema);
