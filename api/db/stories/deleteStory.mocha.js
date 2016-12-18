/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect;

let db,
    story = {};

function deleteStory(story, db) {
  return db.query("DELETE FROM stories WHERE id = ?", story.id)
  .catch(function(error) {
    return {
      log: "error",
      send: true,
      msg: "An internal error has occurred"
    };
  });
}

describe ('Delete story row from table:', function() {
  beforeEach(function() {
    story.id = 42;

    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('deletes row where id matches storyid and returns affectedRows = 1', function() {
    return deleteStory(story, db)
    .then(function(res) {
      expect(res.affectedRows).to.equal(1);
    })
    .catch(function(error) {
      expect(error.msg).to.equal('An internal error has occurred');
    });
  });

  it ('throws error if cannot find story to delete', function() {
    story.id = 9999;
    return deleteStory(story, db)
    .catch(function(error) {
      expect(error.msg).to.equal('An internal error has occurred');
    });
  });

  after(function() {
    return db.query("INSERT INTO stories SET ?", {id: 42, user_id: 43, title: "This will be deleted later", description: "This will also be deleted later"});
  });
});
