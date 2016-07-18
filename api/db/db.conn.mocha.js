/* jslint node: true */
/* jshint esversion: 6 */

const mysql = require('mysql'),
      expect = require('chai').expect,
      secrets = require('./secrets.mocha.json');

var conn = mysql.createConnection(secrets);

function testConnection(connection) {
  return new Promise(function(resolve, reject) {
    return connection.connect(function(err, res) {
      if (err) {
        return resolve(err.stack);
      }

      return resolve(connection.threadId);
    });
  })
  .catch(function(err) {
    console.log(err);
  });
}

describe ('DB: Connects to db', function() {
  it ('returns threadId', function() {
    var connection = mysql.createConnection(secrets);
    return testConnection(connection)
    .then(function(res) {
      expect(res).to.be.a('number');
      expect(connection.state).to.equal('authenticated');
    });
  });

  it ('returns err', function() {
    secrets.user = 'wrong';
    var connection = mysql.createConnection(secrets);
    return testConnection(connection)
    .then(function(res) {
      expect(res).to.be.a('string');
    });
  });
});

if (conn.state === "disconnected") {
  describe ('DB: It is connected', function() {
    it ("is connected", function() {
      return testConnection(conn)
      .then(function(res) {
        expect(conn.state).to.equal("authenticated");
      });
    });
  });
}

module.exports = {
  conn: conn
};
