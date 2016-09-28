'use strict';

const moment = require('moment');

function insertPasswordToken(user, passwordToken, db) {
  return db.query("SELECT COUNT(type_id) FROM tokens WHERE user_id = ? AND type_id = ?", [user.id, 2])
  .then(function(res) {
    if (res[0]['COUNT(type_id)'] > 0) {
      return db.query(`UPDATE tokens SET token = '${passwordToken}', expiration = '${moment().add(1, 'h').format('YYYY-MM-DD HH:mm:ss')}' WHERE user_id = ? AND type_id = ?`, [user.id, 2]);
    } else {
      return db.query(`INSERT INTO tokens SET ?`, {user_id: user.id, type_id: 2, token: passwordToken, expiration: moment().add(1, 'h').format('YYYY-MM-DD HH:mm:ss')});
    }
  })
  .catch(function(error) {
    throw error;
  });
}

module.exports = {
  insertPasswordToken: insertPasswordToken
};
