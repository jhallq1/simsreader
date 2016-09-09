'use strict';

const loginValidator = require('./util/loginValidator.js'),
      checkEmail = require('./getUserByEmail.js'),
      checkUsername = require('./getUserByUsername.js'),
      pwVerify = require('./util/encryption.js');

let data;

let response = {
  log: 'info',
  send: true
};

function loginUser(user) {
  let response_user = {};
  let db = require('../db.conn.js').conn();
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

module.exports = {
  loginUser: loginUser
};
