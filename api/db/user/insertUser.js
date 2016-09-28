'use strict';

const encrypt = require(global.apiPath + '/db/user/util/encryption.js'),
      token = require(global.apiPath + '/db/user/util/tokenGenerator.js'),
      assetpath = require(global.apiPath + '/db/user/util/assetFolderGenerator.js'),
      db = require(global.apiPath + '/db/db.conn.js');

module.exports = function insertUser(data, db) {
  return db.query(`INSERT INTO members (username, email, password, verification_token, assets_path) VALUES ('${data.username}', '${data.email}', '${data.password}', '${token}', '${data.assetPath}')`)
  .catch(function(error) {
    return {
      log: "error",
      send: true,
      msg: "An internal error has occurred",
      logmsg: error
    };
  });
};
