/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect,
      loginValidator = require('./util/loginValidator.js'),
      checkEmail = require('./getUserByEmail.js'),
      toSimpleUser = require('./toSimpleUser.js'),
      pwVerify = require('./util/encryption.js');

let db = require('../db.conn.js').conn();

let response = {
  log: 'info',
  send: true
};

function loginUser(user, db) {
  let response_user = {};
  let data = loginValidator(user);

  if (Object.keys(data).length > 0) {
    response.msg = data;
    return Promise.reject({
       log: "warn",
       send: true,
       msg: response.msg,
       validation: false
     });
  }

  return checkEmail.getUserByEmail(user.email, db)
  .then(function(res) {
    if (res && res.length && res[0].email === user.email) {
      response_user = res[0];
      return res;
    }

   throw {
      log: "warn",
      send: true,
      msg: "Email not found",
      login: false,
      validation: true
    };
  })
  .then(function(res) {
    return pwVerify.verifyHash(user.password, res[0].password);
  })
  .then(function(res) {
    if (res === true) {
      response.msg = "Login Successful";
      response_user.login = true;
      response_user.validation = true;
      response.items = response_user;
      return response;
    }
  })
  .catch(function(err) {
    throw err;
  });
}

describe ('login.js: ', function() {
  let user;

  before(function() {
    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  beforeEach(function() {
    user = {
      email: "abc@test.com",
      password: "testtest"
    };
  });

  it ('fetches user object', function() {
    return loginUser(user, db)
    .then(function(res) {
      return expect(res.items.username).to.equal('test');
    });
  });

  it ('catches error if does not pass validation', function() {
    user.email = "abc.com";
    return loginUser(user, db)
    .catch(function(err) {
      return expect(err.validation).to.equal(false);
    });
  });

  it ('catches error if cannot locate email', function() {
    user.email = "0000000000000@testtest.com";
    return loginUser(user, db)
    .catch(function(err) {
      return expect(err.msg).to.equal("Email not found");
    });
  });

  it ('matches passwords successfully', function() {
    return loginUser(user, db)
    .then(function(res) {
      return expect(res.msg).to.equal("Login Successful");
    });
  });

  it ('catches error if passwords do not match', function() {
    user.password = "notmypassword";
    return loginUser(user, db)
    .catch(function(err) {
      return expect(err.msg).to.equal("Invalid login information");
    });
  });
});
