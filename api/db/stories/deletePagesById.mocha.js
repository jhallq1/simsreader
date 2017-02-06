/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect;

let db,
    chapter_id,
    response = {};

function deletePagesByChapterId(chapter_id, db) {
  return db.query("DELETE FROM pages WHERE chapter_id = ?", chapter_id)
  .then(function(res) {
    return (res.affectedRows > 0) ? (response.msg = "Deleted") : (response.msg = "Nothing to delete");
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

describe ('Delete page rows from table:', function() {
  let chapter_id;

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

  it ('deletes rows where id matches chapter_id and returns success msg', function() {
    return deletePagesByChapterId(chapter_id, db)
    .then(function(res) {
      expect(res).to.equal("Deleted");
    });
  });

  it ('returns error msg if cannot find any pages associated with chapter_id', function() {
    chapter_id = 9999;
    return deletePagesByChapterId(chapter_id, db)
    .catch(function(res) {
      expect(res).to.equal('Nothing to delete');
    });
  });

  it ('throws error if invalid query', function() {
    chapter_id = null;
    return deletePagesByChapterId(chapter_id, db)
    .catch(function(error) {
      expect(error.msg).to.equal('An internal error has occurred');
    });
  });

  after(function() {
    return db.query("INSERT INTO pages SET ?", {id: 1, chapter_id: 5, caption: "caption", path: "18eac3a7"});
  });
});
