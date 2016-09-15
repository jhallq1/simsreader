/* jslint node: true */
/* jshint esversion: 6 */
'use strict';

const expect = require('chai').expect;

let db;
let token;
let username;
let email;
let password;

function insertUser() {
  return db.query("INSERT INTO members (username, email, password, verification_token, assets_path) VALUES ('"+ username + "', '"+ email + "', 'testtest', '" + token + "', '" + token + "/" + token +"')")
  .catch(function(error) {
    return {
      log: "error",
      send: true,
      msg: "An internal error has occurred"
    };
  });
}

describe ('insertuser:', function() {

  beforeEach(function() {
    token = require('E:\\Programming\\simsreader\\api\\db\\user\\util\\tokenGenerator.js');
    username = token;
    email = token + "@test.com";
    password = "testtest";

    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('db state is authenticated', function() {
    expect(db.connection.state).to.equal('authenticated');
  });

  it ('inserts data', function() {
    return insertUser()
    .then(function(res) {
      expect(res.affectedRows).to.equal(1);
    });
  });

  it ('throws an error if user cannot be added', function() {
    username = token;
    return insertUser()
    .catch(function(error) {
      expect(error.msg).to.equal("An internal error has occurred");
    });
  });
});
