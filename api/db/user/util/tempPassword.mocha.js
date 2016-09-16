/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect,
      crypto = require('crypto'),
      pwEncrypt = require('./encryption.js');

function generateTempPassword() {
  return pwEncrypt.hashPass(crypto.randomBytes(4).toString('hex'))
  .catch(function(err) {
    // logger.error(err);
    throw err;
  });
}

function insertTempPassword(email, hash, db) {
  return db.query(`UPDATE members SET password = '${hash}' WHERE email = ?`, email)
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

  it ('generates random pw of length 8 and encryption length equal to 270', function() {
    return generateTempPassword()
    .then(function(hash) {
      expect(crypto.randomBytes(4).toString('hex').length).to.equal(8);
      return expect(hash.length).to.equal(270);
    });
  });

  it ("inserts temp pw into db", function() {
    return generateTempPassword()
    .then(function(hash) {
      return insertTempPassword(user.email, hash, db);
    })
    .then(function(res) {
      return expect(res.affectedRows).to.equal(1);
    });
  });

  it ('catches error if cannot update password to temp', function() {
    user.email = "notindb@test.com";
    return generateTempPassword()
    .then(function(hash) {
      return insertTempPassword(user.email, hash, db);
    })
    .then(function(res) {
      return expect(res.affectedRows).to.equal(0);
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
