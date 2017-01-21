/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect;

function getChapterId(story_id, chapter_index, db) {
  return db.query(`SELECT c.id FROM chapters AS c JOIN stories AS s ON s.id = c.story_id WHERE c.story_id = ${story_id} ORDER BY c.id`)
  .then(function(res) {
    if (res.length) {
      return res[chapter_index - 1].id;
    } else {
      return "Cannot locate story";
    }
  })
  .catch(function(error) {
    throw error;
  });
}

describe ('get chapter id by story_id and chapter_index', function() {
  let db, story_id, chapter_index;

  beforeEach(function() {
    story_id = 40;
    chapter_index = 1;

    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('returns chapter id corresponding to index 1', function() {
    return getChapterId(story_id, chapter_index, db)
    .then(function(res) {
      expect(res).to.equal(5);
    });
  });

  it ('returns chapter id corresponding to index 2', function() {
    chapter_index = 2;
    return getChapterId(story_id, chapter_index, db)
    .then(function(res) {
      expect(res).to.equal(6);
    });
  });

  it ('returns msg if cannot locate story_id', function() {
    story_id = 999;
    chapter_index = 1;
    return getChapterId(story_id, chapter_index, db)
    .then(function(res) {
      expect(res).to.equal('Cannot locate story');
    });
  });
});
