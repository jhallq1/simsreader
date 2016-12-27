'use strict';

const newChapterFormValidator = require('../db/stories/util/newChapterFormValidator.js'),
      insertChapter =  require('../db/stories/insertChapter.js'),
      validateSession = require('../db/user/sessionValidator.js');

let response = {
  log: 'info',
  send: true
};

function createChapter(story_id, chapter_title, user, sid, db) {
  let data = newChapterFormValidator(chapter_title);
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
      return insertChapter.insertChapter(story_id, chapter_title, db);
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
      response.items = {chapter_id: res};
      response.msg = "New Chapter Added";
      return response;
    }
  })
  .catch(function(error) {
    throw error;
  });
}

module.exports = {
  createChapter: createChapter
};
