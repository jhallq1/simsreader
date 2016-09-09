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

function isVerified(token) {
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

describe ('Verify token:', function() {
  before(function() {
    token = "jrtyhegrwefw";
    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      db.query("UPDATE members SET verified = '0' WHERE verification_token = ?", token);
      return db;
    });
  });

  beforeEach(function() {
    token = "jrtyhegrwefw";
  });

  it ('authenticates db connection', function() {
    expect(db.connection.state).to.equal('authenticated');
  });

  it ('finds token in db', function() {
    return isVerified(token)
    .then(function(res) {
      expect(res.res[0].verification_token).to.equal(token);
    });
  });

  it ('catches error if cannot find token', function() {
    token = "aijhdiaohdsioahdios";
    return isVerified(token)
    .catch(function(error) {
      expect(error.msg).to.equal("Token not found");
    });
  });

  it ('checks verified field and finds value 0', function() {
    return isVerified(token)
    .then(function(res) {
      expect(res.res[0].verified).to.equal(0);
    });
  });

  it ('checks verified field and finds value 1', function() {
    token = "jrtdbvfdgwtgesf";
    return isVerified(token)
    .then(function(res) {
      expect(res.res[0].verified).to.equal(1);
    });
  });

  it ('catches error if cannot check verified field', function() {
    token = "ffffffffff";
    return isVerified(token)
    .catch(function(error) {
      expect(error.msg).to.equal("An internal error has occurred");
    });
  });

  it ('updates verified field', function() {
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
});
