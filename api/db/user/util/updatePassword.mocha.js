/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect,
      pwEncrypt = require('./encryption.js'),
      checkEmail = require('./../getUserByEmail.js'),
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
  .catch(function(err) {
    throw "Error";
  });
}

function updatePassword(email, password, db) {
  return pwEncrypt.hashPass(password)
  .then(function(hash) {
    return db.query(`UPDATE members SET password = '${hash}' WHERE email = ?`, email)
    .catch(function(error) {
      throw error;
    });
  });
}

describe ('updatePassword: check validity of token', function() {
  let db, token;

  before(function() {
    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ("verifies that email address belongs to token", function() {
    email = "abc@test.com";
    token = "a3e24efc4187cc1480ba458eaeeb7290f8c047dbab98b85765e9e43c14c000b2";
    return checkExpiration(token, db)
    .then(function(bool) {
      return expect(bool).to.equal(true);
    });
  });

  it ("verifies that email address does not belong to token", function() {
    email = "b76e0feb49ac3570b41007ea4139d46c78f40bd496d2c738b7f02aca04e63cc2@test.com";
    token = "a3e24efc4187cc1480ba458eaeeb7290f8c047dbab98b85765e9e43c14c000b2";
    return checkExpiration(token, db)
    .catch(function(err) {
      expect(err).to.equal("Error");
    });
  });

  it ("verifies that password token is still valid", function() {
    email = "abc@test.com";
    token = "a3e24efc4187cc1480ba458eaeeb7290f8c047dbab98b85765e9e43c14c000b2";
    return checkExpiration(token, db)
    .then(function(bool) {
      return expect(bool).to.equal(true);
    });
  });

  it ("verifies that password token has expired", function() {
    email = "mochalatte@test.com";
    token = "randomexpiredtoken";
    return checkExpiration(token, db)
    .catch(function(err) {
      return expect(err).to.equal("Error");
    });
  });
});

// describe ('updatePassword: override temp pw with new pw', function() {
//   let email, password, hash, db;
//
//   before(function() {
//     return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
//     .then(function(connection) {
//       db = connection;
//       return db;
//     });
//   });
//
//   beforeEach(function() {
//     email = "mochalatte@test.com";
//     password = "newpassword";
//   });
//
//   it ("inserts new pw into db", function() {
//     return updatePassword(email, password, db)
//     .then(function(res) {
//       return expect(res.affectedRows).to.equal(1);
//     });
//   });
//
//   it ('catches error if cannot update password', function() {
//     email = "notindb@test.com";
//     return updatePassword(email, password, db)
//     .then(function(res) {
//       return expect(res.affectedRows).to.equal(0);
//     });
//   });
//
//   afterEach(function() {
//     return db.query("UPDATE members SET password = 'testtest' WHERE email = ?", email)
//     .catch(function(error) {
//       return {
//         log: "error",
//         send: true,
//         msg: "An internal error has occurred"
//       };
//     });
//   });
// });
