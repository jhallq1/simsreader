'use strict';

let db, token, response;

response = {
  log: "info",
  send: true,
  msg: "",
};

module.exports = {
  checkIsVerified: function(token, db) {
    return db.query("SELECT `verification_token`, `verified` FROM `members` WHERE `verification_token` = ?", token)
    .then(function(res) {
      if (res.length && res[0].verified === 0) {
        response.msg = "not verified";
      } else if (res.length && res[0].verified === 1) {
        response.redirect = true;
        response.msg = "verified";
      } else {
        throw {
          log: "error",
          send: true,
          msg: "An internal error has occurred"
        };
      }

      response.res = res;
      return response;
    })
    .catch(function(error) {
      throw error;
    });
  }
};
