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

function checkIsVerified(token) {
  return db.query("SELECT `verification_token`, `verified` FROM `members` WHERE `verification_token` = ?", token)
  .then(function(res) {
    if (res.length && res[0].verified === 0) {
      response.msg = "not verified";
    } else if (res.length && res[0].verified === 1) {
      response.redirect = true;
      response.msg = "verified";
    } else {
      throw {
        log: "error",
        send: true,
        msg: "An internal error has occurred"
      };
    }

    response.res = res;
    return response;
  })
  .catch(function(error) {
    return error;
  });
}

describe ('Checks if account has been verified:', function() {
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

  it ('authenticates db connection', function() {
    expect(db.connection.state).to.equal('authenticated');
  });

  it ('checks verified field and finds value 0', function() {
    return checkIsVerified(token)
    .then(function(res) {
      expect(res.res[0].verified).to.equal(0);
    });
  });

  it ('checks verified field and finds value 1', function() {
    token = "jrtdbvfdgwtgesf";
    return checkIsVerified(token)
    .then(function(res) {
      expect(res.res[0].verified).to.equal(1);
    });
  });

  it ('catches error if cannot check verified field', function() {
    token = "ffffffffff";
    return checkIsVerified(token)
    .catch(function(error) {
      expect(error.msg).to.equal("An internal error has occurred");
    });
  });
});
