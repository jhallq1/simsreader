/* jslint node: true */
/* jshint esversion: 6 */
'use strict';

const mysql = require('promise-mysql'),
      expect = require('chai').expect,
      secrets = require('./secrets.mocha.json');

let connection;

function dbConnect() {
  if (connection) {
    return new Promise(function(resolve, reject) {
      return resolve(connection);
    });
  }

  return mysql.createConnection(secrets)
  .then(function(conn) {
    connection = conn;
    return conn;
  })
  .catch(function(error) {
    throw error;
  });
}

dbConnect();

describe ('DB: Connects to db', function() {
  it ('returns threadId', function() {
    return dbConnect()
    .then(function(res) {
      expect(res.connection.threadId).to.be.a('number');
    });
  });

  it ("is connected", function() {
    return dbConnect()
    .then(function(res) {
      expect(res.connection.state).to.equal("authenticated");
    });
  });

  it ('returns err', function() {
    secrets.user = 'wrong';
    return dbConnect()
    .catch(function(err) {
      expect(err).to.exist();
    });
  });
});

module.exports = {
  connection: connection,
  connect: dbConnect
};
