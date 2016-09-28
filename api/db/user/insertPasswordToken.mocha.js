/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect,
      checkEmail = require('E:\\Programming\\simsreader\\api\\db\\user\\getUserByEmail.js'),
      tokenGenerator = require('./util/tokenGenerator.js'),
      moment = require('moment');

let flag;

function insertPasswordToken(email, passwordToken, db) {
  passwordToken = tokenGenerator;
  let user = {};

  return checkEmail.getUserByEmail(email, db)
  .then(function(res) {
    user = res[0];
    return db.query("SELECT COUNT(type_id) FROM tokens WHERE user_id = ? AND type_id = ?", [user.id, 2]);
  })
  .then(function(res) {
    if (res[0]['COUNT(type_id)'] > 0) {
      flag = "update";
      return db.query(`UPDATE tokens SET token = '${passwordToken}', expiration = '${moment().add(1, 'h').format('YYYY-MM-DD HH:mm:ss')}' WHERE user_id = ? AND type_id = ?`, [user.id, 2]);
    } else {
      flag = "insert";
      return db.query(`INSERT INTO tokens SET ?`, {user_id: user.id, type_id: 2, token: passwordToken, expiration: moment().add(1, 'h').format('YYYY-MM-DD HH:mm:ss')});
    }
  })
  .catch(function(error) {
    throw error;
  });
}

describe ("insertPasswordToken:", function() {
  let email, db, passwordToken, expDate, user_id;

  before(function() {
    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('update existing password token', function() {
    email = "abc@test.com";
    return insertPasswordToken(email, passwordToken, db)
    .then(function(res) {
      expect(flag).to.equal("update");
      expect(res.affectedRows).to.equal(1);
    });
  });

  it ('add new token for user\'s first request', function() {
    email = "mochalatte@test.com";
    return insertPasswordToken(email, passwordToken, db)
    .then(function(res) {
      expect(flag).to.equal("insert");
      expect(res.affectedRows).to.equal(1);
    });
  });

  //
  // deleting where user_id = 2 in order to test INSERT because can't insert if already exists
  //
  afterEach(function() {
    return db.query("DELETE FROM tokens WHERE user_id = ?", 2)
    .catch(function(error) {
      return {
        log: "error",
        send: true,
        msg: "An internal error has occurred"
      };
    });
  });
});
