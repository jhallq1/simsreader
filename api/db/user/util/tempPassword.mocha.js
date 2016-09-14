/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect,
      pwEncrypt = require('./encryption.js');

let tempPassword = "";

function generateTempPassword() {
  var charSet = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < (Math.floor(Math.random() * (16 - 8)) + 8); i ++) {
    tempPassword += charSet.charAt(Math.random() * charSet.length);
  }
  return tempPassword;
}

function insertTempPassword(db, user) {
  return pwEncrypt.hashPass(tempPassword)
  .then(function(hash) {
    tempPassword = hash;
  })
  .then(function(res) {
    return db.query(`UPDATE members SET password = '${user.tempPassword}' WHERE email = ?`, user.email)
    .catch(function(error) {
      throw error;
    });
  });
}

describe ('tempPassword: ', function() {
  let user, db;

  beforeEach(function() {
    user = {email:  "abcd@test.com"};

    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ("generates temp pw", function() {
    return generateTempPassword();
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

  // after(function() {
  //   return db.query("UPDATE members SET password = 'abcdabcd' WHERE email = ?", user.email)
  //   .catch(function(error) {
  //     return {
  //       log: "error",
  //       send: true,
  //       msg: "An internal error has occurred"
  //     };
  //   });
  // });
});
