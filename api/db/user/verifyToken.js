'use strict';

const logger = require(global.apiPath + '/logger.js');

let response = {
  log: "info",
  send: true,
  msg: "",
};

let error = {
  log: "error",
  send: true,
  redirect: true
};

function isVerified(db, verification_token) {
  return db.query("SELECT `verification_token`, `verified` FROM `members` WHERE `verification_token` = ?", verification_token)
  .catch(function(err) {
    logger.error(err);
    throw error;
  });
}

function updateVerified(db, verification_token) {
  return db.query("UPDATE members SET verified = '1' WHERE verification_token = ?", verification_token)
  .then(function(res) {
    response.res = res;
    response.msg = "Account is now verified";
    return response;
  })
  .catch(function(err) {
    logger.error(err);
    throw error;
  });
}

function verifyToken(db, verification_token) {
  return isVerified(db, verification_token)
  .then(function(res) {
    if (res.length && res[0].verified === 0) {
      return updateVerified(db, verification_token);
    } else {
      throw error;
    }
  })
  .catch(function(error) {
    throw error;
  });
}

module.exports = {
  verifyToken: verifyToken
};
