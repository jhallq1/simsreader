/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect,
      moment = require('moment');

let response = {};

function updateChapter(chapter, db) {
  return db.query("UPDATE chapters SET title = '" + chapter.title + "', last_updated = '" + moment().format('YYYY-MM-DD HH:mm:ss') + "' WHERE id = ?", chapter.id)
  .then(function(res) {
    if (res.affectedRows == 1) {
      response.msg = "Chapter Has Been Updated";
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

describe ('Updates chapter row:', function() {
  let db, chapter = {};

  beforeEach(function() {
    chapter.id = 6;
    chapter.title = "Chicken";
  });

  before(function() {
    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('updates row and returns success msg', function() {
    return updateChapter(chapter, db)
    .then(function(res) {
      expect(res.msg).to.equal('Chapter Has Been Updated');
    });
  });

  it ('throws error msg if cannot update table', function() {
    chapter.id = null;
    return updateChapter(chapter, db)
    .catch(function(error) {
      expect(error.msg).to.equal('An internal error has occurred');
    });
  });
});
