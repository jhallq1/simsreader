/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect,
      loginValidator = require('./util/loginValidator.js'),
      checkEmail = require('./getUserByEmail.js'),
      toSimpleUser = require('./toSimpleUser.js'),
      pwVerify = require('./util/encryption.js');

let db = require('../db.conn.js').conn();
let data, user;

let response = {
  log: 'info',
  send: true
};

function loginUser(user) {
  let response_user = {};
  data = loginValidator(user);

  if (Object.keys(data).length > 0) {
    response.msg = data;
    return Promise.reject({
       log: "warn",
       send: true,
       msg: response.msg,
       validation: false
     });
  }

  return checkEmail(data.email, db)
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
      response.items = {
        login: true,
        validation: true,
        user: response_user
      };
      return response;
    }
  })
  .catch(function(err) {
    throw err;
  });
}

describe ('login.js: ', function() {
  beforeEach(function() {
    let user;

    let data = {
      email: "abc@test.com",
      password: "testtest"
    };

    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('logins user', function() {
    return loginUser(user)
    .then(function(res) {
      expect(response).to.be.a('object');
    });
  });
});
