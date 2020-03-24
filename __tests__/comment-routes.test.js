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

  it('creates a new comment', async() => {
    const tweet = await Tweet.create(testTweet);
    return request(app)
      .post('/api/v1/comments')
      .send({ tweetId: tweet._id, handle: 'scott', text: '' })
      .then(result => {
        expect(result.body).toEqual({ 
          tweetId: expect.any(String), 
          handle: 'scott', 
          text: expect.any(String), 
          _id: expect.any(String), 
          __v: 0 });
      });
  });

  it('gets a comment by id with populated tweet', async() => {
    const tweet = await Tweet.create(testTweet);
    return Comment.create({
      tweetId: tweet._id, 
      handle: 'scott', 
      text: ''
    })
      .then(comment => {
        return request(app)
          .get(`/api/v1/comments/${comment._id}`)
          .then(result => {
            expect(result.body).toEqual({
              handle: 'scott', 
              text: expect.any(String), 
              _id: expect.any(String), 
              __v: 0,
              tweetId: { ...testTweet, _id: expect.any(String), __v: 0 } 
            });
          });
      });
  });

  it('updates a comments text only', async() => {
    const tweet = await Tweet.create(testTweet);
    return Comment.create({
      tweetId: tweet._id, 
      handle: 'scott', 
      text: ''
    })
      .then(comment => {
        return request(app)
          .patch(`/api/v1/comments/${comment._id}`)
          .send({ text: 'this is that new new text' })
          .then(result => {
            expect(result.body).toEqual({
              handle: 'scott', 
              text: 'this is that new new text', 
              _id: expect.any(String), 
              __v: 0,
              tweetId: expect.any(String) 
            });
          });
      });
  });
  it('delets a comments', async() => {
    const tweet = await Tweet.create(testTweet);
    return Comment.create({
      tweetId: tweet._id, 
      handle: 'scott', 
      text: ''
    })
      .then(comment => {
        return request(app)
          .delete(`/api/v1/comments/${comment._id}`)
          .then(result => {
            expect(result.body).toEqual({
              handle: 'scott', 
              text: expect.any(String), 
              _id: expect.any(String), 
              __v: 0,
              tweetId: expect.any(String) 
            });
          });
      });
  });
});
