'use strict';

const moment = require('moment');

function isPwTokenValid(db, token) {
  return db.query("SELECT `expiration` FROM `tokens` WHERE `token` = ?", token)
  .then(function(res) {
    if (res[0] && moment(res[0].expiration).isAfter(moment().format('YYYY-MM-DD HH:mm:ss'))) {
      return true;
    }

    throw false;
  })
  .catch(function(error) {
    throw {
      log: "error",
      send: true,
      msg: "This link has already expired",
      redirect: true,
      logmsg: error
    };
  });
}

module.exports = {
  isPwTokenValid: isPwTokenValid
};
