/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect,
      parse = require('./parseSessionData.mocha.js');

function validateSessionData(user, db) {
  return parse.parseSessionData(user, db)
  .then(function(res) {
    return (user.id === res.user.id ? true : false);
  })
  .catch(function(error) {
    throw error;
  });
}

describe('validate session data', function() {
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

  it('returns true if userID matches responseID', function() {
    return validateSessionData(user, db)
    .then(function(res) {
      expect(res).to.equal(true);
    });
  });

  it('returns false if userID and responseID do not match', function() {
    user.id = 11;
    return validateSessionData(user, db)
    .then(function(res) {
      expect(res).to.equal(false);
    });
  });

  it('throws error if cannot query db', function() {
    user = {};
    return validateSessionData(user, db)
    .catch(function(error) {
      expect(error.code).to.equal("ER_PARSE_ERROR");
    });
  });
});
