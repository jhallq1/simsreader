// 1. query the db
// 2. check for existing email
// 3. if email already exists, alert user
// 4. check for existing username
// 5. if username is already taken, alert username
// 6. encrypt pw
// 7. insert username and email and pw
// 8. alert user

'use strict';

/* jslint node: true */
/* jshint esversion: 6 */
const chai = require('chai'),
      expect = require('chai').expect;

let db,
    email = "";

function getUserByEmail(db) {
  return db.query("SELECT * FROM `members` WHERE `email` = ?", email);
}

describe ('Register: db is connected', function() {

  beforeEach(function() {
    email = "abc@test.com";

    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('db state is authenticated', function() {
    expect(db.connection.state).to.equal('authenticated');
  });

  it ('returns first user', function() {

    return getUserByEmail(db)
    .then(function(res) {
      expect(res[0].email).to.equal('abc@test.com');
    });
  });

  it('catches err if thrown', function() {
    email = null;

    return getUserByEmail(db)
    .catch(function(err) {
      expect(err.code).to.equal('ER_PARSE_ERROR');
    });
  });
});
//
// describe ('Finds user by email', function() {
//
//
//
// });
