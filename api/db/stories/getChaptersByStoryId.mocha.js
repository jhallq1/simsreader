/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect;

function getChaptersByStoryId(story_id, db) {
  return db.query("SELECT * FROM `chapters` WHERE `story_id` = ?", story_id)
  .then(function(res) {
    if (res.length && res[0].story_id === story_id) {
      return res;
    } else {
      return "This story does not contain any chapters";
    }
  })
  .catch(function(error) {
    throw error;
  });
}

describe ('get chapters by story id:', function() {
  let db, story_id;

  beforeEach(function() {
    story_id = 40;

    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('returns all chapters for story', function() {
    return getChaptersByStoryId(story_id, db)
    .then(function(res) {
      expect(res).to.have.length.above(0);
    });
  });

  it ('returns msg if cannot locate any chapters for story', function() {
    story_id = 1576;
    return getChaptersByStoryId(story_id, db)
    .then(function(res) {
      expect(res).to.equal('This story does not contain any chapters');
    });
  });

  it ('catches err if thrown', function() {
    story_id  = null;
    return getChaptersByStoryId(story_id, db)
    .catch(function(error) {
      expect(error.code).to.equal('ER_PARSE_ERROR');
    });
  });
});
