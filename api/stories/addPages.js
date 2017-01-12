'use strict';

const captionValidator = require('../db/stories/util/captionValidator.js'),
      insertPages =  require('../db/stories/insertPageData.js'),
      validateSession = require('../db/user/sessionValidator.js');

let response = {
  log: 'info',
  send: true
};

function addPages(files, story_id, chapter_id, captions, user, sid, db) {
  let data = captionValidator(captions);
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
      return insertPages.insertPages(files, story_id, chapter_id, captions, user, db);
    }

    throw {
       log: "warn",
       send: true,
       msg: "Could not validate session",
       login: false
     };
  })
  .then(function(res) {
    if (res > 0) {
      response.msg = "Your draft has been successfully saved";
      return response;
    }
  })
  .catch(function(error) {
    throw error;
  });
}

module.exports = {
  addPages: addPages
};
