/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const chai = require('chai'),
      expect = require('chai').expect;

function getAssetsPath(email, db) {
  return db.query("SELECT * FROM `members` WHERE `email` = ?", email)
  .then(function(res) {
    if (res[0] && res[0].email === email) {
      return res[0].assets_path;
    } else {
      return "Cannot find email";
    }
  })
  .catch(function(error) {
    throw error;
  });
}

describe ('getAssetsPath:', function() {
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
    return getAssetsPath(email, db)
    .then(function(res) {
      console.log(res);
      expect(res).to.equal('0bf679c1/f4238512');
    });
  });

  it ('returns msg if cannot locate email in db', function() {
    email = "userNOTinDB@test.com";
    return getAssetsPath(email, db)
    .then(function(res) {
      expect(res).to.equal('Cannot find email');
    });
  });

  it ('catches err if thrown', function() {
    email = null;
    return getAssetsPath(email, db)
    .catch(function(error) {
      expect(error.code).to.equal('ER_PARSE_ERROR');
    });
  });
});
