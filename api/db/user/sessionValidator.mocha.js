/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect;

function sessionValidator(user, db) {
  return db.query("SELECT * FROM `sessions` WHERE `session_id` = ?", user.session_id)
  .then(function(res) {
    if(res[0] && res[0].session_id == user.session_id) {
      return JSON.parse(res[0].data);
    }
  })
  .then(function(res) {
    return user.id == res.user.id ? true : "Invalid session";
  });
}

describe('sessionValidator:', function() {
  let db;

  let user = {
    session_id: "23c957cc892185d62e69",
    id: 43
  };

  before(function() {
    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it('returns true for valid session', function() {
    return sessionValidator(user, db)
    .then(function(res) {
      expect(res).to.equal(true);
    });
  });

  it('returns error msg for invalid session', function() {
    user.id = 568;
    return sessionValidator(user, db)
    .then(function(res) {
      expect(res).to.equal("Invalid session");
    });
  });
});

module.exports = {
  sessionValidator: sessionValidator
};
