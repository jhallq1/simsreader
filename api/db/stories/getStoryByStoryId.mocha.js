/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect;

function getStoryDetails(story_id, db) {
  return db.query("SELECT * FROM `stories` WHERE `id` = ?", story_id)
  .then(function(res) {
    if (res[0] && res[0].id === story_id) {
      return res[0];
    } else {
      return "Cannot locate story";
    }
  })
  .catch(function(error) {
    throw error;
  });
}

describe ('get data from stories table by id', function() {
  let db, story_id;

  beforeEach(function() {
    story_id = 40;

    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('returns row with matching story_id', function() {
    return getStoryDetails(story_id, db)
    .then(function(res) {
      expect(res.id).to.equal(story_id);
    });
  });

  it ('returns msg if cannot locate story_id', function() {
    story_id = 1;
    return getStoryDetails(story_id, db)
    .then(function(res) {
      expect(res).to.equal('Cannot locate story');
    });
  });
});
