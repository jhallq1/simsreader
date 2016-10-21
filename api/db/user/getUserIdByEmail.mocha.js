/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const chai = require('chai'),
      expect = require('chai').expect;

function getUserId(email, db) {
  return db.query("SELECT * FROM `members` WHERE `email` = ?", email)
  .then(function(res) {
    if (res[0] && res[0].email === email) {
      return res[0].id;
    } else {
      return "Cannot find email";
    }
  })
  .catch(function(error) {
    throw error;
  });
}

describe ('getUserIdByEmail:', function() {
  let db,
      email = "";

  beforeEach(function() {
    email = "abc@test.com";

    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('returns assets_path for user matching email', function() {
    return getUserId(email, db)
    .then(function(res) {
      expect(res).to.equal(1);
    });
  });

  it ('returns msg if cannot locate email in db', function() {
    email = "userNOTinDB@test.com";
    return getUserId(email, db)
    .then(function(res) {
      expect(res).to.equal('Cannot find email');
    });
  });

  it ('catches err if thrown', function() {
    email = null;
    return getUserId(email, db)
    .catch(function(error) {
      expect(error.code).to.equal('ER_PARSE_ERROR');
    });
  });
});
