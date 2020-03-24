require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Tweet = require('../lib/models/Tweet');


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

  it('creates a new tweet', () => {
    return request(app)
      .post('/api/v1/tweets')
      .send(testTweet)
      .then(result => {
        expect(result.body).toEqual({ ...testTweet, _id: expect.any(String), __v: 0 });
      });
  });

  it('gets all tweets', () => {
    return Tweet.create(testTweet)
      .then(res => {
        return request(app)
          .get('/api/v1/tweets')
          .then(result => {
            expect(result.body).toEqual([{ ...testTweet, _id: expect.any(String), __v: 0 }]);
          });
      });
  });

  it('gets a tweet by id', () => {
    return Tweet.create(testTweet)
      .then(tweet => {
        return request(app)
          .get(`/api/v1/tweets/${tweet._id}`)
          .then(result => {
            expect(result.body).toEqual({ ...testTweet, _id: expect.any(String), __v: 0 });
          });
      });
  });

  it('updates a tweeets text only', () => {
    return Tweet.create(testTweet)
      .then(tweet => {
        return request(app)
          .patch(`/api/v1/tweets/${tweet._id}`)
          .send({ text: 'new text for tweet' })
          .then(result => {
            expect(result.body).toEqual({ handle: 'scott', text: 'new text for tweet', _id: expect.any(String), __v: 0 });
          });
      });
  });

  it('deletes a tweet by id', () => {
    return Tweet.create(testTweet)
      .then(tweet => {
        return request(app)
          .delete(`/api/v1/tweets/${tweet._id}`)
          .then(result => {
            expect(result.body).toEqual({ ...testTweet, _id: expect.any(String), __v: 0 });
          });
      });
  });
});
