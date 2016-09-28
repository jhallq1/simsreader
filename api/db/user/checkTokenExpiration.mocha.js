/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect,
      pwEncrypt = require('./util/encryption.js'),
      checkEmail = require('./getUserByEmail.js'),
      moment = require('moment');

let db, email;

function checkExpiration(token, db) {
  return checkEmail.getUserByEmail(email, db)
  .then(function(res) {
    if (res[0].email === email) {
      return db.query("SELECT `expiration` FROM `tokens` WHERE `user_id` = ? AND `token` = ?", [res[0].id, token])
      .then(function(res) {
        return (res[0] && moment(res[0].expiration).isAfter(moment().format('YYYY-MM-DD HH:mm:ss'))) ? true : false;
      });
    }
  })
  .catch(function(error) {
    throw error;
  });
}

describe ('checkTokenExpiration.js:', function() {
  let db, token;

  before(function() {
    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  beforeEach(function() {
    return db.query(`UPDATE tokens SET token = 'b1368467dab2b4cc02ae1c90e176f427973727f383af0f3ec65ef3859dca0b7a', expiration = '${moment().add(1, 'h').format('YYYY-MM-DD HH:mm:ss')}' WHERE user_id = 1`);
  });

  it ("verifies that password token is still valid", function() {
    email = "abc@test.com";
    token = "b1368467dab2b4cc02ae1c90e176f427973727f383af0f3ec65ef3859dca0b7a";
    return checkExpiration(token, db)
    .then(function(bool) {
      return expect(bool).to.equal(true);
    });
  });

  it ("verifies that password token has expired", function() {
    email = "mochalatte@test.com";
    token = "randomexpiredtoken";
    return checkExpiration(token, db)
    .catch(function(error) {
      return expect(error).to.equal("Error");
    });
  });
});
