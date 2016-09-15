'use strict';

const expect = require('chai').expect;

let db,
    id,
    email = "";

function getAccessToken(db) {
  return db.query("SELECT * FROM `members` WHERE `email` = ?", email)
  .then(function(res) {
    return res[0].verification_token;
  })
  .catch(function(err) {
    return {
      log: "error",
      send: true,
      msg: "Cannot find email"
    };
  });
}

describe ('getAccessToken:', function(res) {

  beforeEach(function() {
    email = "mochalatte@test.com";

    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('db state is authenticated', function() {
    expect(db.connection.state).to.equal('authenticated');
  });

  it ('returns token', function() {
    return getAccessToken(db)
    .then(function(res) {
      expect(res).to.equal('jrtdbvfdgwtgesf');
    });
  });

  it('catches err if thrown', function() {
    email = null;
    return getAccessToken(db)
    .catch(function(err) {
      expect(err.msg).to.equal('Cannot find email');
    });
  });
});
