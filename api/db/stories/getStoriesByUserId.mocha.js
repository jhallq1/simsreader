/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect;

function getStoriesByUserId(user, db) {
  return db.query("SELECT * FROM `stories` WHERE `user_id` = ?", user.id)
  .then(function(res) {
    if (res[0] && res[0].user_id === user.id) {
      return res;
    } else {
      return "User has not created any stories";
    }
  })
  .catch(function(error) {
    throw error;
  });
}

describe ('get stories by user id:', function() {
  let db,
      user = {};

  beforeEach(function() {
    user.id = 2;

    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('returns all stories for user', function() {
    return getStoriesByUserId(user, db)
    .then(function(res) {
      expect(res[0].user_id).to.equal(2);
    });
  });

  it ('returns msg if cannot locate any stories for user', function() {
    user.id = 55;
    return getStoriesByUserId(user, db)
    .then(function(res) {
      expect(res).to.equal('User has not created any stories');
    });
  });

  it ('catches err if thrown', function() {
    user.id = null;
    return getStoriesByUserId(user, db)
    .catch(function(error) {
      expect(error.code).to.equal('ER_PARSE_ERROR');
    });
  });
});
