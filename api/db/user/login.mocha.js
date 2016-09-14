'use strict';

const expect = require('chai').expect,
      loginValidator = require('./util/loginValidator.js').loginValidator,
      checkEmail = require('./getUserByEmail.js'),
      toSimpleUser = require('./toSimpleUser.js'),
      pwVerify = require('./util/encryption.js');

let data;

let response = {
  log: 'info',
  send: true
};

function loginUser(user) {
  let db = require('./db.conn.js').conn();
  data = loginValidator(user);

  if (Object.keys(data).length > 0) {
    response.msg = data;
    return response;
  }

  return checkEmail.getUserByEmail(user.email, db)
  .then(function(res) {
    if (res && res.length && res[0].email === user.email) {
      return response;
    }
  })
  .then(function() {
    return pwVerify.verifyPass(user.password);
  });
}
