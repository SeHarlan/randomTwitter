require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Tweet = require('../lib/models/Tweet');
const Comment = require('../lib/models/Comment');


const testTweet = {
  handle: 'scott',
  text: 'this is a test tweet'
};
const emptyTweet = {
  handle: 'scott',
  text: ''
};

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  // * `POST /api/v1/comments` create a comment
// * `GET /api/v1/comments/:id` get a comment by id and populate tweet
// * `PATCH /api/v1/comments/:id` update a comment
// * `DELETE /api/v1/comments/:id` delete a comment
});
