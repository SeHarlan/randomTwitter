const Tweet = require('../models/Tweet');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    Tweet
      .create(req.body)
      .then(tweet => res.send(tweet))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Tweet
      //gets all tweets
      .then(tweet => res.send(tweet))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Tweet
    //gets tweet by id

      .then(tweet => res.send(tweet))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Tweet

      //updates a tweets text only
      .then(tweet => res.send(tweet))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Tweet
    //deletes a tweet by id

      .then(tweet => res.send(tweet))
      .catch(next);
  })
;
