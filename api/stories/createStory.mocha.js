/*global describe, it, before, beforeEach, after, afterEach */
'use strict';

const expect = require('chai').expect,
      newStoryFormValidator = require('../db/stories/util/newStoryFormValidator.js'),
      insertStory =  require('../db/stories/insertNewStory.js');

let db = require('../db/db.conn.js').conn();
let response = {};

function createStory(user, story, db) {
  let response_story = {};
  let data = newStoryFormValidator(story);

  if (Object.keys(data).length > 0) {
    response.msg = data;
    return Promise.reject({
       log: "warn",
       send: true,
       msg: response.msg,
       validation: false
     });
  }

  return insertStory.insertNewStory(user, story, db)
  .then(function(res) {
    if (!res) {
      //TODO throw proper log error
      throw "Failed to create story";
    }

    return res;
  })
  .catch(function(error) {
    throw error;
  });
}

describe('createStory.js', function() {
  let story, user;

  before(function() {
    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  beforeEach(function() {
    story = {
      title: "Title",
      description: "Description"
    };

    user = {
      id: "3",
      email: "test@test.com",
      username: "test"
    };
  });

  it('throws error if fails validation', function() {
    story.title = "";
    return createStory(user, story, db)
    .catch(function(error) {
      return expect(error.validation).to.equal(false);
    });
  });

  it('returns response if successful', function() {
    return createStory(user, story, db)
    .then(function(res) {
      return expect(res).to.be.a('number');
    });
  });

  after(function() {
    return db.query("DELETE FROM stories WHERE user_id = 3");
  });
});
