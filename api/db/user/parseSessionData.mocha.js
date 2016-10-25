/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect;

function parseSessionData(user, db) {
  return db.query("SELECT * FROM `sessions` WHERE `session_id` = ?", user.session_id)
  .then(function(res) {
    if(res[0] && res[0].session_id === user.session_id) {
      return JSON.parse(res[0].data);
    } else {
      throw "Invalid sessionID";
    }
  })
  .catch(function(error) {
    throw error;
  });
}

module.exports = {
  parseSessionData: parseSessionData
};

describe('parse session data', function() {
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

  it('parses data string for sessionID found in table', function() {
    return parseSessionData(user, db)
    .then(function(res) {
      expect(res).to.be.a('object');
    });
  });

  it('throws error if cannot find sessionID', function() {
    user.session_id = "1111111111111111";
    return parseSessionData(user, db)
    .catch(function(error) {
      expect(error).to.equal("Invalid sessionID");
    });
  });
});
