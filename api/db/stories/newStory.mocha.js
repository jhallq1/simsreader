/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect,
      getId = require('../user/getUserIdByEmail.js');

function newStory(email, story, db) {
  return getId.getUserId(email, db)
  .then(function(res) {
    return db.query("INSERT INTO stories SET ?", {user_id: res, title: story.title, description: story.description})
    .then(function(response) {
      if (response && response.affectedRows === 1) {
        return true;
      }
    })
    .catch(function(error) {
      throw {
        log: "error",
        send: true,
        msg: "An internal error has occurred"
      };
    });
  });
}

describe ('newStory:', function() {
  let db,
      response,
      email = "",
      story = {};

  beforeEach(function() {
    email = "abc@test.com";
    story.title = "This is a title";
    story.description = "This is a description.";

    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it('inserts story details into table', function() {
    return newStory(email, story, db)
    .then(function(res) {
      expect(res).to.equal(true);
    });
  });

  it('throws error if cannot find userid', function() {
    email = "notindb@db.com";
    return newStory(email, story, db)
    .catch(function(error) {
      expect(error.msg).to.equal("an internal error has occurred");
    });
  });

  afterEach(function() {
    return db.query("DELETE FROM stories WHERE user_id = 1");
  });
});
