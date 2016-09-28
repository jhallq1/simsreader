/* jslint node: true */
/* jshint esversion: 6 */
/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect;

let db, token, response;

response = {
  log: "info",
  send: true,
  msg: "",
};

function updateVerified(token) {
  return db.query("UPDATE members SET verified = '1' WHERE verification_token = ?", token)
  .then(function(res) {
    response.res = res;
    response.msg = "Account is now verified";
    return response;
  })
  .catch(function(error) {
    throw {
      log: "error",
      send: true,
      msg: "An internal error has occurred"
    };
  });
}

describe ('Updates verified field:', function() {
  before(function() {
    token = "jrtyhegrwefw";
    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  beforeEach(function() {
    token = "jrtyhegrwefw";
  });

  it ('changes verified field from 0 to 1', function() {
    return updateVerified(token)
    .then(function(res) {
      expect(res.msg).to.equal("Account is now verified");
    });
  });

  it ('redirects if already verified', function() {
    token = "jrtdbvfdgwtgesf";
    return updateVerified(token)
    .catch(function(res) {
      expect(res.msg).to.equal("Account has already been verified");
    });
  });

  afterEach(function() {
    return db.query("UPDATE members SET verified = '0' WHERE verification_token = ?", "jrtyhegrwefw");
  });
});
