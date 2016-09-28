/*global describe, it, before, beforeEach, after, afterEach */

/* jslint node: true */
/* jshint esversion: 6 */

'use strict';

const chai = require('chai'),
      expect = require('chai').expect;

function getUserByUsername(username, db) {
  return db.query("SELECT * FROM `members` WHERE `username` = ?", username)
  .then(function(res) {
    if (res[0] && res[0].username === username) {
      return res;
    } else {
      return "Cannot find username";
    }
  })
  .catch(function(error) {
    throw error;
  });
}

describe ('GetUserByUsername:', function() {
  let db,
      username = "";

  beforeEach(function() {
    username = "mochalatte";

    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('returns first user matching username', function() {
    return getUserByUsername(username, db)
    .then(function(res) {
      expect(res[0].username).to.equal('mochalatte');
    });
  });

  it ('returns msg if cannot locate username in db', function() {
    username = "userNOTinDB";
    return getUserByUsername(username, db)
    .then(function(res) {
      expect(res).to.equal('Cannot find username');
    });
  });

  it ('catches err if thrown', function() {
    username = null;
    return getUserByUsername(username, db)
    .catch(function(error) {
      expect(error.code).to.equal('ER_PARSE_ERROR');
    });
  });
});
