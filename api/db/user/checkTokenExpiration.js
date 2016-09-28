'use strict';

const checkEmail = require('./getUserByEmail.js'),
      moment = require('moment');

function checkTokenExpiration(db, email, token) {
  return checkEmail.getUserByEmail(email, db)
  .then(function(res) {
    if (res[0].email === email) {
      return db.query("SELECT `expiration` FROM `tokens` WHERE `user_id` = ? AND `token` = ?", [res[0].id, token])
      .then(function(res) {
        return (res[0] && moment(res[0].expiration).isAfter(moment().format('YYYY-MM-DD HH:mm:ss'))) ? true : false;
      });
    }
  })
  .catch(function(error) {
    return {
      log: "error",
      send: true,
      msg: "This link has already expired",
      logmsg: error
    };
  });
}

module.exports = {
  checkTokenExpiration: checkTokenExpiration
};
