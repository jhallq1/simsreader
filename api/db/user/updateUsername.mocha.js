/* jslint node: true */
/* jshint esversion: 6 */
/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect,
      moment = require('moment');

let db,
    email = "";

function updateUsername() {
  return db.query("UPDATE members SET username = 'espresso' WHERE email = ?", email)
  .catch(function(error) {
    return {
      log: "error",
      send: true,
      msg: "An internal error has occurred"
    };
  });
}

describe ('Update username:', function() {
  before(function() {
    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  beforeEach(function() {
    email = "mochalatte@test.com";
  });

  it ('authenticates db connection', function() {
    expect(db.connection.state).to.equal('authenticated');
  });

  it ('updates username column', function() {
    return updateUsername()
    .then(function(res) {
      expect(res.affectedRows).to.equal(1);
    });
  });

  it ('throws error if cannot update username column', function() {
    email = "mocha@test.com";
    return updateUsername()
    .catch(function(error) {
      expect(error.msg).to.equal('An internal error has occurred');
    });
  });

  after(function() {
    return db.query("UPDATE members SET username = 'mochalatte' WHERE email = ?", email)
    .catch(function(error) {
      return {
        log: "error",
        send: true,
        msg: "An internal error has occurred"
      };
    });
  });
});
