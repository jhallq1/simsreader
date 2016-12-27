/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect,
      moment = require('moment');

function updateStory(story, db) {
  return db.query(`UPDATE stories SET title = '${story.title}', description = '${story.description}', last_updated = '${moment().format('YYYY-MM-DD HH:mm:ss')}', age_restricted = '${story.age_restricted}' WHERE id = ?`, story.id)
  .then(function(res) {
    if (res.affectedRows == 1) {
      return "Story Has Been Updated";
    }
  })
  .catch(function(error) {
    return {
      log: "error",
      send: true,
      msg: "An internal error has occurred"
    };
  });
}

describe ('Updates story row:', function() {
  let db, story = {};

  beforeEach(function() {
    story.id = 55;
    story.title = "Alphabets";
    story.description = "Tricks Are For Kids";
    story.age_restricted = '1';
  });

  before(function() {
    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('updates row and returns success msg', function() {
    return updateStory(story, db)
    .then(function(res) {
      expect(res).to.equal('Story Has Been Updated');
    })
    .catch(function(error) {
      expect(error.msg).to.equal('An internal error has occurred');
    });
  });

  it ('throws error msg if cannot update table', function() {
    story.id = null;
    return updateStory(story, db)
    .catch(function(error) {
      expect(error.msg).to.equal('An internal error has occurred');
    });
  });
});
