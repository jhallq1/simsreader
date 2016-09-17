'use strict';

const expect = require('chai').expect,
      crypto = require('crypto'),
      pwEncrypt = require('./encryption.js'),
      logger = require(global.apiPath + '/logger.js');

function generateTempPassword(tempPassword) {
  return pwEncrypt.hashPass(tempPassword)
  .catch(function(err) {
    logger.error(err);
    throw err;
  });
}

let insertTempPassword = function(email, tempPassword, db) {
  return generateTempPassword(tempPassword)
  .then(function(tempPassword) {
    return db.query(`UPDATE members SET password = '${tempPassword}' WHERE email = ?`, email);
  })
  .catch(function(error) {
    throw error;
  });
};

module.exports = {
  insertTempPassword: insertTempPassword
};
