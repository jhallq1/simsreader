'use strict';

const checkEmail = require('../db/user/getUserByEmail.js'),
      insertTempPw = require('../db/user/insertTempPassword.js'),
      emailer = require(`${global.apiPath}/db/email/transport.js`),
      insertEmail = require(`${global.apiPath}/db/email/insertEmail.js`),
      crypto = require('crypto'),
      toSimpleUser = require(`${global.apiPath}/users/toSimpleUser.js`),
      insertPasswordToken = require('../db/user/insertPasswordToken.js'),
      tokenGenerator = require('../db/user/util/tokenGenerator.js');

let type_id = 2;

let response = {
  log: 'info',
  send: true
};

let email_prams = {
  subject: "Reset Your Simsreader Password",
  template: "tempPassword"
};

function forgotPassword(email) {
  let db = require(`${global.apiPath}/db/db.conn.js`).conn();
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
    return insertTempPw.insertTempPassword(email, tempPassword, db);
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

module.exports = {
  forgotPassword: forgotPassword
};
