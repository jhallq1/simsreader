'use strict';

const crypto = require('crypto'),
      pwEncrypt = require('./util/encryption.js');


let changePassword = function(email, password, db) {
  return pwEncrypt.hashPass(password)
  .then(function(hash) {
    return db.query(`UPDATE members SET password = '${hash}' WHERE email = ?`, email);
  })
  .catch(function(error) {
    throw error;
  });
};

module.exports = {
  changePassword: changePassword
};
