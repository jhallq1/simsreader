// 1. query the db
// 2. check for existing username
// 3. if username already exists, alert user
// 4. query db
// 5. check if new username exists
// 6. if exists, repeat 3-5
// 7. if unique, insert username into db

/* jslint node: true */
/* jshint esversion: 6 */

//console.log(__dirname);
'use strict';

const chai = require('chai'),
      expect = require('chai').expect;

let db,
    username = "";

function getUserByUsername(db) {
    return db.query("SELECT * FROM `members` WHERE `username` = ?", username);
}

describe ('GetByUsername: db is connected', function() {

  beforeEach(function() {
    username = "mochalatte";

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
    return getUserByUsername(db)
    .then(function(res) {
      expect(res[0].username).to.equal('mochalatte');
    });
  });

  it('catches err if thrown', function() {
    username = null;
    return getUserByUsername(db)
    .catch(function(err) {
      expect(err.code).to.equal('ER_PARSE_ERROR');
    });
  });
});
