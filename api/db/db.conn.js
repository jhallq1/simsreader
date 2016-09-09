/* jslint node: true */
/* jshint esversion: 6 */
'use strict';

const mysql = require('promise-mysql'),
      secrets = require('./secrets.json'),
      conn = mysql.createConnection(secrets);

let dbConn = {};

function setDbConn(newDbConn) {
  dbConn = newDbConn;
};

function getDbConn() {
  return dbConn;
};

function dbConnect() {
  return mysql.createConnection(secrets)
  .then(function(res) {
    setDbConn(res);
    return dbConn;
  })
  .catch(function(error) {
    console.log(error);
    throw error;
  });
}

function init() {
  if (!dbConn.connection) {
    return dbConnect()
    .then(function(res) {
      console.log("*****************");
      console.log("* Connected to DB");
      console.log("*****************");
      return res;
    })
    .catch(function(error) {
      console.log(error);
      throw error;
    });
  } else {
    return Promise.resolve(getDbConn());
  }
}

module.exports = {
  conn: getDbConn,
  init: init
};
