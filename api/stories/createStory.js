/*global describe, it, before, beforeEach, after, afterEach */
'use strict';

const newStoryFormValidator = require('../db/stories/util/newStoryFormValidator.js'),
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

module.exports = {
  createStory: createStory
};
