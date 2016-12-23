/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect;

let db,
    chapter = {},
    response = {};

function deleteChapter(chapter, db) {
  return db.query("DELETE FROM chapters WHERE id = ?", chapter.id)
  .then(function(res) {
    if (res.affectedRows == 1) {
      response.msg = "Chapter Was Deleted";
    }
    return response;
  })
  .catch(function(error) {
    response = {
      log: "error",
      send: true,
      msg: "An internal error has occurred"
    };

    return response;
  });
}

describe ('Delete chapter row from table:', function() {
  beforeEach(function() {
    chapter.id = 7;

    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('deletes row where id matches chapterid and returns success msg', function() {
    return deleteChapter(chapter, db)
    .then(function(res) {
      expect(res.msg).to.equal("Chapter Was Deleted");
    });
  });

  it ('throws error if cannot find chapter to delete', function() {
    chapter.id = 9999;
    return deleteChapter(chapter, db)
    .catch(function(error) {
      expect(error.msg).to.equal('An internal error has occurred');
    });
  });

  after(function() {
    return db.query("INSERT INTO chapters SET ?", {id: 7, story_id: 55, title: "This will be deleted later"});
  });
});
