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
function insertEmail(user, type_id, db) {
  return db.query("INSERT INTO email SET ?", {user_id: user.id, type_id: type_id, email: user.email})
  .then(function(response) {
    id = response.insertId; //for deleting test data
    if (response.affectedRows === 1) {
      return true;
    }
  })
  .catch(function(error) {
    // logger.error()
    throw error;
  });
}

describe ("send ver email:", function() {
  let type_id = 1;

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
    return insertEmail(user, type_id, db)
    .then(function(res) {
      return expect(res).to.equal(true);
    });
  });

  after(function() {
    db.query('DELETE FROM email WHERE ?', {id: id});
  });
});
