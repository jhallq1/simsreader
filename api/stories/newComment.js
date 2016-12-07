'use strict';

const commentFormValidator = require('../db/stories/util/commentFormValidator.js'),
      insertComment =  require('../db/stories/insertComment.js'),
      validateSession = require('../db/user/sessionValidator.js');

let db = require('../db/db.conn.js').conn();
let response = {
  log: 'info',
  send: true
};

function newComment(comment, user, sid, chapterID, db) {

  let data = commentFormValidator(comment);
  if (Object.keys(data).length > 0) {
    response.msg = data;
    return Promise.reject({
       log: "warn",
       send: true,
       msg: response.msg,
       validation: false
     });
  }

  return validateSession.sessionValidator(user.id, user.sid, db)
  .then(function(res) {
    if (res) {
      return insertComment.insertComment(user.id, chapterID, comment, db);
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
