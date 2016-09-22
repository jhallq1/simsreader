'use strict';

const resetPasswordValidator = require('./util/resetPasswordValidator.js'),
      checkEmail = require('./getUserByEmail.js'),
      pwVerify = require('./util/encryption.js'),
      updatePassword = require('./util/updatePassword.js');

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

  return updatePassword.checkExpiration(db, user.email, user.token)
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
    return updatePassword.updatePassword(user.email, user.password, db);
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
  .catch(function(err) {
    if (err) {
      response = {
        log: "error",
        logmsg: err,
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
