/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect,
      crypto = require('crypto'),
      pwEncrypt = require('./encryption.js');

let tempPassword = "";

function generateTempPassword() {
  tempPassword = crypto.randomBytes(4).toString('hex');

  if (tempPassword.length === 8) {
    return pwEncrypt.hashPass(tempPassword)
    .then(function(hash) {
      tempPassword = hash;
    });
  }

  return tempPassword;
}

function insertTempPassword(db, user) {
  return db.query(`UPDATE members SET password = '${tempPassword}' WHERE email = ?`, user.email)
  .catch(function(error) {
    throw error;
  });
}

describe ('tempPassword: ', function() {
  let user, db;

  before(function() {
    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  beforeEach(function() {
    user = {email:  "abcd@test.com"};
  });

  it ('generates random pw of length 8 and encrypts it', function() {
    return generateTempPassword()
    .then(function() {
      expect(tempPassword.length).to.equal(270);
    });
  });

  it ("inserts temp pw into db", function() {
    return insertTempPassword(db, user)
    .then(function(res) {
      expect(res.affectedRows).to.equal(1);
    });
  });

  it ('catches error if cannot update password to temp', function() {
    user.email = "notindb@test.com";
    return insertTempPassword(db, user)
    .then(function(error) {
      expect(error.affectedRows).to.equal(0);
    });
  });

  afterEach(function() {
    return db.query("UPDATE members SET password = 'abcdabcd' WHERE email = ?", user.email)
    .catch(function(error) {
      return {
        log: "error",
        send: true,
        msg: "An internal error has occurred"
      };
    });
  });
});
