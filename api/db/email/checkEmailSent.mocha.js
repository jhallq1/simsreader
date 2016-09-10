// after email has fired,
// take userid, email
// insert into email table with typeid 1
// return send msg "success look for email"
// swallow error
// respond internal error has occurred please email support

/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect;

let db, response, user, id;

/*******************
*@param type_id: 1
/******************/
function checkEmailSent(user, type_id, db) {
  return db.query("SELECT COUNT(type_id) FROM email WHERE email = ? AND type_id = ?", [user.email, type_id])
  .then(function(res) {
    return res[0]['COUNT(type_id)'] > 0 ? true : false;
  })
  .catch(function(error) {
    throw error;
  });
}

describe ("check for previously sent emails:", function() {
  let type_id = 1;

  before(function() {
    user = {
      email: "abc@test.com"
    };

    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('verifies email already sent', function() {
    return checkEmailSent(user, type_id, db)
    .then(function(res) {
      expect(res).to.equal(true);
    });
  });

  it ('verifies email may be sent', function() {
    user.email = "rainbow@test.com";
    return checkEmailSent(user, type_id, db)
    .then(function(res) {
      expect(res).to.equal(false);
    });
  });

});
