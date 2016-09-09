const moment = require('moment');

module.exports = function(db, email) {
  var date = moment().format('YYYY-MM-DD HH:mm:ss');

  return db.query("UPDATE members SET last_login = '" + date + "' WHERE email = ?", email)
  .catch(function(error) {
    return {
      log: "error",
      send: true,
      msg: "An internal error has occurred"
    };
  });
};
