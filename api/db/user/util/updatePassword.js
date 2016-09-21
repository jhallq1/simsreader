'use strict';

const expect = require('chai').expect,
      pwEncrypt = require('./encryption.js'),
      checkEmail = require('./../getUserByEmail.js'),
      moment = require('moment');

function checkExpiration(db, email, token) {
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

function updatePassword(email, password, db) {
  return pwEncrypt.hashPass(password)
  .then(function(hash) {
    return db.query("UPDATE members SET password = '" + hash + "' WHERE email = ?", email)
    .catch(function(error) {
      throw error;
    });
  });
}

module.exports = {
  checkExpiration: checkExpiration,
  updatePassword: updatePassword
};
