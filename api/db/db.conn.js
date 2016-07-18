/* jslint node: true */
/* jshint esversion: 6 */
const mysql = require('mysql'),
      secrets = require('./secrets.json'),
      conn = mysql.createConnection(secrets);

function connectDb() {
  return new Promise(function(resolve, reject) {
    return conn.connect(function(err, res) {
      if (err) {
        return resolve(err.stack);
      }

      return resolve(conn.threadId);
    });
  });
}

if (conn.state === "disconnected") {
  connectDb();
}

module.exports = {
  conn: conn
};
