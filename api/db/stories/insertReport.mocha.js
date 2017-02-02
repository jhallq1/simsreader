/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect;

function insertReport(story_id, chapter_id, comment_id, flags, explanation, db) {
  return db.query("INSERT INTO reports SET ?", {story_id: story_id, chapter_id: chapter_id, comment_id: comment_id, flags: flags.toString(), explanation: explanation})
  .then(function(res) {
    if (res.affectedRows === 1) {
      return res.insertId;
    }
  })
  .catch(function(error) {
    throw error;
  });
}

describe ('Inserts data from Report Form into reports table:', function() {
  let story_id, chapter_id, comment_id, flags, explanation, db;

  beforeEach(function() {
    story_id = 44;
    chapter_id = 18;
    comment_id = "Not Provided";
    flags = [1, 3];
    explanation = "Not Provided";
  });

  before(function() {
    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('inserts values into new row and returns insertId', function() {
    return insertReport(story_id, chapter_id, comment_id, flags, explanation, db)
    .then(function(res) {
      expect(res).to.be.a('number');
    });
  });

  it ('inserts values into new row and returns insertId', function() {
    story_id = "Not Provided";
    flags = [5];
    explanation = "Spammy";
    return insertReport(story_id, chapter_id, comment_id, flags, explanation, db)
    .then(function(res) {
      expect(res).to.be.a('number');
    });
  });

  it ('throws error if insertion fails', function() {
    story_id = null;
    return insertReport(story_id, chapter_id, comment_id, flags, explanation, db)
    .catch(function(error) {
      expect(error.code).to.equal('ER_BAD_NULL_ERROR');
    });
  });
});
