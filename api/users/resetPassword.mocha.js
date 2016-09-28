/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect,
      checkEmail = require('../db/user/getUserByEmail.js'),
      pwVerify = require('../db/user/util/encryption.js'),
      insertPassword = require('../db/user/insertTempPassword.js');

let data, email, tempPassword, password;

let response = {
  log: 'info',
  send: true
};

function resetPassword(user, db) {

  return checkEmail.getUserByEmail(email, db)
  .then(function(res) {
    if (res && res.length && res[0].email === email) {
      return res;
    }
    throw "Email not found";
  })
  .then(function(res) {
    return pwVerify.verifyHash(tempPassword, res[0].password);
  })
  .then(function(res) {
    return insertPassword.insertPassword(email, password, db);
  })
  .then(function(res) {
    if (res) {
      return {
        log: "info",
        send: true,
        msg: "You have successfully changed your password. Please login.",
        items: {
          status: true
        }
      };
    }
  })
  .catch(function(error) {
    if (error) {
      response = {
        log: "error",
        logmsg: error,
        send: true,
        msg: "Invalid token and/or credentials."
      };
      return response;
    }
    throw response;
  });
}

describe ('resetPassword.js: ', function() {
  let db, password, tempPassword;

  before(function() {
    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  beforeEach(function() {
    email = "abc@test.com";
    password = "testtest";
    tempPassword = "testtest";
  });

  it ('catches error if cannot locate email', function() {
    email = "0000000000000@testtest.com";
    return resetPassword(email, db)
    .catch(function(error) {
      return expect(error.msg).to.equal("Invalid token and/or credentials.");
    });
  });
});
