/* jslint node: true */
/* jshint esversion: 6 */
'use strict';

const registrationValidator = require('./user/util/registrationValidator.js').registrationValidator,
      checkEmail = require('./user/getUserByEmail.js'),
      checkUsername = require('./user/getUserByUsername.js'),
      pwEncrypt = require('./user/util/encryption.js'),
      token = require('./user/util/tokenGenerator.js'),
      insertUser = require('./user/insertUser.js'),
      assetGenerator = require('./user/util/assetFolderGenerator.js');

let data;
let response = {
  log: 'info',
  send: true
};

function registerUser(user) {
  let db = require('./db.conn.js').conn();
  data = registrationValidator(user);

  if (Object.keys(data).length > 0) {
    response.msg = data;
    return response;
  }

  user.token = token;

  return checkEmail.getUserByEmail(user.email, db)
  .then(function(res) {
    if (res && res.length && res[0].email === user.email) {
      response.msg = 'This email address is already registered';
      response.items = {
        status: false
      };
      throw response;
    }
  })
  .then(function() {
    return checkUsername.getUserByUsername(user.username, db)
    .then(function(res) {
      if (res && res.length && res[0].username === user.username) {
        response.msg = 'This username is already taken';
        response.items = {
          status: false
        };
        throw response;
      }
      return pwEncrypt.hashPass(user.password);
    })
    .catch(function(err) {
      throw err;
    });
  })
  .then(function(hash) {
    user.password = hash;
    return assetGenerator();
  })
  .then(function(path) {
    user.assetPath = path;
    return insertUser(user, db);
  })
  .then(function(res) {
    if (res.insertId) {
      user.id = res.insertId;
      return {
        log: "info",
        send: true,
        msg: "Registration successful. You will receive an email confirming your account. Please check your inbox.",
        items: {
          user: simpleUser(user),
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
        msg: "An internal error has occured."
      };

      return response;
    }

    throw response;
  });
}

function simpleUser(user) {
  return {
    email: user.email,
    id: user.id,
    username: user.username
  };
}

module.exports = {
  registerUser: registerUser
};
