/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect;

function insertChapter(storyID, chapter, db) {
  return db.query("INSERT INTO chapters SET ?", {story_id: storyID, title: chapter.title})
  .then(function(response) {
    if (response && response.affectedRows === 1) {
      return response.insertId;
    }
  })
  .catch(function(error) {
    throw {
      log: "error",
      send: true,
      msg: "An internal error has occurred"
    };
  });
}

describe ('Inserts chapter data into table', function() {
  let db,
      response,
      storyID = "",
      chapter = {};


  beforeEach(function() {
    storyID = 40;
    chapter.title = "Chapter 1";
  });

  before(function() {
    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it('returns insertID if successfully adds data to table', function() {
    return insertChapter(storyID, chapter, db)
    .then(function(response) {
      expect(typeof response).to.equal('number');
    });
  });

  it('throws error if cannot add data to table', function() {
    chapter.title = null;
    return insertChapter(storyID, chapter, db)
    .catch(function(error) {
      expect(error.msg).to.equal('An internal error has occurred');
    });
  });

  after(function() {
    return db.query("DELETE FROM chapters WHERE story_id = 40");
  });
});
