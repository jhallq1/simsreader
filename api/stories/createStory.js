'use strict';

const newStoryFormValidator = require('../db/stories/util/newStoryFormValidator.js'),
      insertStory =  require('../db/stories/insertNewStory.js'),
      validateSession = require('../db/user/sessionValidator.js');

let response = {
  log: 'info',
  send: true
};

function createStory(story, user, sid, db) {
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

  return validateSession.sessionValidator(user, sid, db)
  .then(function(res) {
    if (res) {
      return insertStory.insertNewStory(story, user, db);
    }

    throw {
       log: "warn",
       send: true,
       msg: "Could not validate session",
       login: false
     };
  })
  .then(function(res) {
    if (typeof res === 'number') {
      response.items = {story_id: res};
      response.msg = "Your Story Has Been Created!";
      return response;
    }
  })
  .catch(function(error) {
    throw error;
  });
}

module.exports = {
  createStory: createStory
};
