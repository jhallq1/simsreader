/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect,
      pwEncrypt = require('./util/encryption.js');

function updatePassword(db, user) {
  return pwEncrypt.hashPass(user.newPassword)
  .then(function(hash) {
    user.newPassword = hash;
  })
  .then(function(res) {
    return db.query(`UPDATE members SET password = '${user.newPassword}' WHERE email = ?`, user.email)
    .catch(function(error) {
      throw error;
    });
  });
}

describe ('Change password:', function() {
  let user, db;

  beforeEach(function() {
    user = {
      email: "abc@test.com",
      newPassword: "testtest"
    };

    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('updates password column with new hashed password', function() {
    return updatePassword(db, user)
    .then(function(res) {
      expect(res.affectedRows).to.equal(1);
    })
    .catch(function(error) {
      expect(error.msg).to.equal('An internal error has occurred');
    });
  });

  it ('catches error if cannot change password', function() {
    user.email = "notindb@test.com";
    return updatePassword(db, user)
    .then(function(error) {
      expect(error.affectedRows).to.equal(0);
    });
  });
});
