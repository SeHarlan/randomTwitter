const request = require('superagent');

function getRandomQuote() {
  return request
    .get('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
    .then(res => res.body)
    .then(([res]) => res);
}

module.exports = {
  getRandomQuote
};
