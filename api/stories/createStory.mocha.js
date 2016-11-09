/*global describe, it, before, beforeEach, after, afterEach */
'use strict';

const expect = require('chai').expect,
      newStoryFormValidator = require('../db/stories/util/newStoryFormValidator.js'),
      insertStory =  require('../db/stories/insertNewStory.js'),
      validateSession = require('../db/user/sessionValidator.js');

let db = require('../db/db.conn.js').conn();
let response = {
  log: 'info',
  send: true
};

function createStory(story, user, db) {

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

  return validateSession.sessionValidator(user, db)
  .then(function(res) {
    if (true) {
      return insertStory.insertNewStory(user, story, db);
    }

    throw {
       log: "warn",
       send: true,
       msg: "Could not validate session",
       login: false,
       validation: true
     };
  })
  .catch(function(error) {
    throw error;
  });
}

describe('createStory.js', function() {
  let story = {
    title: "Title",
    description: "Description"
  };

  let user = {
    id: "43",
    session_id: "23c957cc892185d62e69"
  };

  before(function() {
    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it('inserts new row into stories table', function() {
    return createStory(story, user, db)
    .then(function(res) {
      return expect(res).to.be.a('number');
    });
  });

  after(function() {
    return db.query("DELETE FROM stories WHERE user_id = 43");
  });
});
