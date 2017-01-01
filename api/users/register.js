/* jslint node: true */
/* jshint esversion: 6 */
'use strict';

const registrationValidator = require('./util/registrationValidator.js').registrationValidator,
      checkEmail = require('../db/user/getUserByEmail.js'),
      checkUsername = require('../db/user/getUserByUsername.js'),
      pwEncrypt = require('../db/user/util/encryption.js'),
      token = require('../db/user/util/tokenGenerator.js'),
      insertUser = require('../db/user/insertUser.js'),
      assetGenerator = require('../db/user/util/assetFolderGenerator.js'),
      checkEmailSent = require(`${global.apiPath}/db/email/checkEmailSent.js`),
      insertEmail = require(`${global.apiPath}/db/email/insertEmail.js`),
      emailer = require(`${global.apiPath}/db/email/transport.js`),
      toSimpleUser = require('./toSimpleUser.js'),
      createUAK = require('../aws/s3/createUserAssetKey.js');

let data;
let type_id = 1;

let response = {
  log: 'info',
  send: true
};

let email_prams = {
  subject: "Please Verify Your Simsreader Account",
  template: "register"
};

function registerUser(user) {
  let db = require('../db/db.conn.js').conn();
  data = registrationValidator(user);

  if (Object.keys(data).length > 0) {
    response.msg = data;
    return response;
  }

  user.verification_token = token;

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
    .catch(function(error) {
      throw error;
    });
  })
  .then(function(hash) {
    user.password = hash;
    return assetGenerator();
  })
  .then(function(path) {
    user.assetPath = path;
    return createUAK(path);
  })
  .then(function() {
        return insertUser(user, db);
  })
  .then(function(res) {
    user.id = res.insertId;
    return checkEmailSent(user, type_id, db);
  })
  .then(function(res) {
    if (res) {
      response.msg = "This email is already verified";
      throw response;
    }
    return emailer(email_prams.subject, null, email_prams.template, user.email, {username: user.username, verification_token: user.verification_token});
  })
  .then(function() {
    return insertEmail(user, type_id, db);
  })
  .then(function(res) {
    if (user.id) {
      return {
        log: "info",
        send: true,
        msg: "Registration successful. You will receive an email confirming your account. Please check your inbox.",
        items: {
          user: toSimpleUser(user),
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

module.exports = {
  registerUser: registerUser
};
