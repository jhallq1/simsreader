'use strict';

const expect = require('chai').expect,
      pwEncrypt = require('./encryption.js');

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
  updatePassword: updatePassword
};
