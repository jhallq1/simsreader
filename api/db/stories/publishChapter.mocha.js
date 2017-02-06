/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect,
      moment = require('moment');

function publishChapter(chapter_id, db) {
  return db.query("UPDATE chapters SET published = ?, last_updated = ? WHERE id = ?", [1, moment().format('YYYY-MM-DD HH:mm:ss'), chapter_id])
  .then(function(res) {
    if (res.affectedRows == 1) {
      return "Chapter Has Been Published";
    }
  })
  .catch(function(error) {
    throw error;
  });
}

describe ('Updates published and last_updated columns in chapters table:', function() {
  let db, chapter_id;

  beforeEach(function() {
    chapter_id = 5;
  });

  before(function() {
    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('updates row and returns success msg', function() {
    return publishChapter(chapter_id, db)
    .then(function(res) {
      expect(res).to.equal('Chapter Has Been Published');
    });
  });

  it ('throws error msg if cannot update table', function() {
    chapter_id = 99;
    return publishChapter(chapter_id, db)
    .catch(function(error) {
      expect(error).to.equal('An internal error has occurred');
    });
  });

  after(function() {
    return db.query("UPDATE chapters SET published = ? WHERE id = ?", [0, 5]);
  });
});
