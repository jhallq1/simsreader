'use strict';

const resetPasswordValidator = require('./util/resetPasswordValidator.js'),
      checkEmail = require('../db/user/getUserByEmail.js'),
      pwVerify = require('../db/user/util/encryption.js'),
      changePassword = require('../db/user/changePassword.js'),
      checkTokenExp = require('../db/user/checkTokenExpiration.js');

let data;

let response = {
  log: 'info',
  send: true
};

function checkExp(user, db) {
  data = resetPasswordValidator(user);

  if (Object.keys(data).length > 0) {
    response.msg = data;
    return Promise.reject({
       log: "warn",
       send: true,
       msg: response.msg,
       validation: false
    });
  }

  return checkTokenExp.checkTokenExpiration(db, user.email, user.token)
  .then(function(res) {
    if (true) {
      return res;
    }
  })
  .catch(function(error) {
    if (error) {
      response = {
        log: "error",
        logmsg: error,
        send: true,
        msg: "This link has already expired."
      };
      return response;
    }
    throw response;
  });
}

function resetPassword(user, db) {
  data = resetPasswordValidator(user);

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
      return res;
    }
    throw "Email not found";
  })
  .then(function(res) {
    return pwVerify.verifyHash(user.tempPassword, res[0].password);
  })
  .then(function(res) {
    return changePassword.changePassword(user.email, user.password, db);
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
      console.log(error);
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

module.exports = {
  resetPassword: resetPassword,
  checkExp: checkExp
};
