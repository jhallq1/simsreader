'use strict';

let response = {
  log: "info",
  send: true,
  msg: "",
};

module.exports = {
  updateVerified: function(token, db) {
    return db.query("UPDATE members SET verified = '1' WHERE verification_token = ?", token)
    .then(function(res) {
      response.res = res;
      response.msg = "Account is now verified";
      return response;
    })
    .catch(function(error) {
      throw {
        log: "error",
        send: true,
        msg: "An internal error has occurred"
      };
    });
  }
};
