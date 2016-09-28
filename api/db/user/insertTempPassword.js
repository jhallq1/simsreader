'use strict';

const crypto = require('crypto'),
      pwEncrypt = require('./util/encryption.js');


let insertTempPassword = function(email, tempPassword, db) {
  return pwEncrypt.hashPass(tempPassword)
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
