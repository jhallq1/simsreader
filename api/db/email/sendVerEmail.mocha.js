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
function insertEmail(user, db) {
  return db.query("INSERT INTO email SET ?", {user_id: user.id, type_id: 1, email: user.email})
  .then(function(response) {
    id = response.insertId; //for deleting test data
    return {
      log: "info",
      send: true,
      msg: "Registration successful. You will receive an email confirming your account. Please check your inbox.",
      items: {
        user: user,
        status: true
      }
    };
  })
  .catch(function(error) {
    // logger.error()
    throw error;
  });
}

function checkVerEmailSent(db, user) {
  return db.query("SELECT `type_id` FROM `members` WHERE `email` = ?", user.email)
  .then(function(response) {
    console.log(response);
    if (response[0].type_id < 1) {
      return {
        log: "info",
        send: true,
        msg: "Verification email has been resent. Please check your inbox."
      };
    }
  })
  .catch(function(error) {
    throw {
      msg: "Verification email was already sent. Cannot resend."
    };
  });
}

describe ("send ver email:", function() {
  before(function() {
    user = {
      email: "mochalatte@test.com",
      id: "2"
    };

    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('has a method called insertEmail', function() {
    expect(typeof insertEmail).to.equal("function");
  });

  it ('inserts data into db', function() {
    return insertEmail(user, db)
    .then(function(response) {
      expect(response).to.be.a('object');
      return expect(id).to.be.a('number');
    });
  });

  after(function() {
    db.query('DELETE FROM email WHERE ?', {id: id});
  });

  it ('sends email if not sent yet', function() {
    return checkVerEmailSent(db, user)
    .then(function(msg) {
      expect(msg.msg).to.be.equal('Verification email has been resent. Please check your inbox.');
    })
    .catch(function(msg) {
      expect(msg.msg).to.be.equal('Verification email was already sent. Cannot resend.');
    });
  });

  it ('catches error if already sent', function() {
    return checkVerEmailSent(db, user)
    .then(function(msg) {
      expect(msg.msg).to.be.equal('Verification email was already sent. Cannot resend.');
    })
    .catch(function(msg) {
      expect(msg.msg).to.be.equal('Verification email was already sent. Cannot resend.');
    });
  });
});
