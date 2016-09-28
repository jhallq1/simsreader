/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect,
      checkEmail = require('../db/user/getUserByEmail.js'),
      emailer = require('../db/email/transport.js'),
      insertEmail = require('../db/email/insertEmail.js'),
      crypto = require('crypto'),
      toSimpleUser = require('./toSimpleUser.js'),
      insertTempPassword = require('../db/user/insertTempPassword.js'),
      insertPasswordToken = require('../db/user/insertPasswordToken.js'),
      tokenGenerator = require('../db/user/util/tokenGenerator.js');

let type_id = 2;

let db = require('../db/db.conn.js').conn();

let response = {
  log: 'info',
  send: true
};

let email_prams = {
  subject: "Reset Your Simsreader Password",
  template: "tempPassword"
};

function forgotPassword(email, db) {
  let passwordToken = tokenGenerator;
  let tempPassword = crypto.randomBytes(4).toString('hex');
  let user;

  return checkEmail.getUserByEmail(email, db)
  .then(function(res) {
    if (res && res.length && res[0].email === email) {
      user = res[0];
      return user;
    }

    throw "Email not found";
  })
  .then(function(res) {
    return insertPasswordToken.insertPasswordToken(user, passwordToken, db);
  })
  .then(function() {
    return insertTempPassword.insertTempPassword(email, tempPassword, db);
  })
  .then(function(res) {
    return emailer(email_prams.subject, null, email_prams.template, email, {username: user.username, tempPassword: tempPassword, passwordToken: passwordToken});
  })
  .then(function() {
    return insertEmail(user, type_id, db);
  })
  .then(function(res) {
    if (res) {
      return {
        log: "info",
        send: true,
        msg: "You will receive an email containing directions to reset your password. Please check your inbox.",
        items: {
          status: true
        }
      };
    }
  })
  .catch(function(errorResponse) {
    if (!response.msg) {
      response = {
        log: "error",
        logmsg: errorResponse,
        send: true,
        msg: "An internal error has occurred."
      };

      return response;
    }

    throw response;
  });
}

describe ('forgotPassword.js: ', function() {
  let user, email;

  before(function() {
    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  beforeEach(function() {
    email = "abc@test.com";
  });

  it ('returns success message', function() {
    return forgotPassword(email, db)
    .then(function(res) {
      return expect(res.msg).to.equal("You will receive an email containing directions to reset your password. Please check your inbox.");
    });
  });

  it ('catches error if cannot locate email', function() {
    email = "0000000000000@testtest.com";
    return forgotPassword(email, db)
    .catch(function(error) {
      return expect(error.msg).to.equal("Email not found");
    });
  });
});
