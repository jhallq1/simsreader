/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect,
      pwEncrypt = require('./encryption.js');

function updatePassword(email, password, db) {
  return pwEncrypt.hashPass(password)
  .then(function(hash) {
    return db.query(`UPDATE members SET password = '${hash}' WHERE email = ?`, email)
    .catch(function(error) {
      throw error;
    });
  });
}

describe ('updatePassword: ', function() {
  let email, password, hash, db;

  before(function() {
    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  beforeEach(function() {
    email = "mochalatte@test.com";
    password = "newpassword";
  });

  it ("inserts new pw into db", function() {
    return updatePassword(email, password, db)
    .then(function(res) {
      return expect(res.affectedRows).to.equal(1);
    });
  });

  it ('catches error if cannot update password', function() {
    email = "notindb@test.com";
    return updatePassword(email, password, db)
    .then(function(res) {
      return expect(res.affectedRows).to.equal(0);
    });
  });

  afterEach(function() {
    return db.query("UPDATE members SET password = 'testtest' WHERE email = ?", email)
    .catch(function(error) {
      return {
        log: "error",
        send: true,
        msg: "An internal error has occurred"
      };
    });
  });
});
