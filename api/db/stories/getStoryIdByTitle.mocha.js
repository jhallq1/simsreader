/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect;

function getStoryId(story_title, user_id, db) {
  return db.query("SELECT id FROM `stories` WHERE `title` = ? AND `user_id` = ?", [story_title, user_id])
  .then(function(res) {
    if (res.length) {
      return res[0].id;
    } else {
      return "Cannot locate story";
    }
  })
  .catch(function(error) {
    throw error;
  });
}

describe ('get story id by title and user', function() {
  let db, story_title, user_id;

  beforeEach(function() {
    story_title = "Do not delete";
    user_id = 2;

    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('returns story_id', function() {
    return getStoryId(story_title, user_id, db)
    .then(function(res) {
      expect(res).to.be.a('number');
    });
  });

  it ('returns msg if cannot locate story_id', function() {
    story_title = "Do not deleteeeee";
    user_id = 2;
    return getStoryId(story_title, user_id, db)
    .then(function(res) {
      expect(res).to.equal('Cannot locate story');
    });
  });
});
