'use strict';

const captionValidator = require('../db/stories/util/captionValidator.js'),
      insertPages =  require('../db/stories/insertPageData.js'),
      validateSession = require('../db/user/sessionValidator.js');

let response = {
  log: 'info',
  send: true
};

function addPages(story_id, chapter_id, data, user, sid, db) {
  let pages = captionValidator(data);
  if (Object.keys(pages).length > 0) {
    response.msg = pages;
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
      return insertPages.insertPages(data, user, story_id, chapter_id, db);
    }

    throw {
       log: "warn",
       send: true,
       msg: "Could not validate session",
       login: false
     };
  })
  .then(function(res) {
    if (res.length) {
      response.keys = res;
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
