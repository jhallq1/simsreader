'use strict';

const logger = require(global.apiPath + '/logger.js'),
      isVerified = require('./checkIsVerified.js'),
      updateVerified = require('./updateVerified.js');

let db;

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

module.exports = {
  verifyToken: function(token, db) {
    return isVerified.checkIsVerified(token, db)
    .then(function(response) {
      if (response.res && response.res.length && response.res[0].verified === 0) {
        return updateVerified.updateVerified(token, db);
      } else {
        throw error;
      }
    })
    .catch(function(error) {
      throw error;
    });
  }
};
