/*global describe, it, before, beforeEach, after, afterEach */

/* jslint node: true */
/* jshint esversion: 6 */

//console.log(__dirname);
'use strict';

const chai = require('chai'),
      expect = require('chai').expect;

let db,
    username = "";

function getUserByUsername(db) {
  return db.query("SELECT * FROM `members` WHERE `username` = ?", username)
  .then(function(res) {
    if (res[0] && res[0].username === username) {
      return res;
    } else {
      return "Cannot find username";
    }
  })
  .catch(function(err) {
    throw err;
  });
}

describe ('GetUserByUsername:', function() {

  beforeEach(function() {
    username = "mochalatte";

    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('returns first user', function() {
    return getUserByUsername(db)
    .then(function(res) {
      expect(res[0].username).to.equal('mochalatte');
    });
  });

  it ('returns msg if cannot locate username in db', function() {
    username = "userNOTinDB";
    return getUserByUsername(db)
    .then(function(res) {
      expect(res).to.equal('Cannot find username');
    });
  });

  it ('catches err if thrown', function() {
    username = null;
    return getUserByUsername(db)
    .catch(function(err) {
      expect(err.code).to.equal('ER_PARSE_ERROR');
    });
  });
});
