/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect,
      moment = require('moment');

let db,
    story = {};

let date = moment().format('YYYY-MM-DD HH:mm:ss');

function editStory(story, db) {
  return db.query("UPDATE stories SET title = '" + story.title + "', description = '" + story.description + "', last_updated = '" + date + "', age_restricted = '" + story.age_restricted + "' WHERE id = ?", story.id)
  .catch(function(error) {
    return {
      log: "error",
      send: true,
      msg: "An internal error has occurred"
    };
  });
}

describe ('Update stories table:', function() {
  beforeEach(function() {
    story = {
      id: 42,
      title: "New Title",
      description: "New Description",
      age_restricted: 1
    };

    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('updates columns and returns affectedRows = 1', function() {
    return editStory(story, db)
    .then(function(res) {
      expect(res.affectedRows).to.equal(1);
    })
    .catch(function(error) {
      expect(error.msg).to.equal('An internal error has occurred');
    });
  });
});
