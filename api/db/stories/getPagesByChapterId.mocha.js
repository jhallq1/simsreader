/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect;

function getPagesByChapterId(chapter_id, db) {
  return db.query(`SELECT p.chapter_id, p.caption, p.path FROM pages AS p JOIN chapters AS c ON c.id = p.chapter_id WHERE c.id = ${chapter_id} ORDER BY p.id`)
  .then(function(res) {
    if (res.length && res[0].chapter_id === chapter_id) {
      return res;
    } else {
      return "This chapter does not contain any pages";
    }
  })
  .catch(function(error) {
    throw error;
  });
}

describe ('get pages by chapter id:', function() {
  let db, chapter_id;

  beforeEach(function() {
    chapter_id = 5;

    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('returns all pages for chapter', function() {
    return getPagesByChapterId(chapter_id, db)
    .then(function(res) {
      expect(res).to.have.length.above(0);
    });
  });

  it ('returns msg if cannot locate any pages for chapter', function() {
    chapter_id = 1576;
    return getPagesByChapterId(chapter_id, db)
    .then(function(res) {
      expect(res).to.equal('This chapter does not contain any pages');
    });
  });

  it ('catches err if thrown', function() {
    chapter_id  = null;
    return getPagesByChapterId(chapter_id, db)
    .catch(function(error) {
      expect(error.code).to.equal('ER_PARSE_ERROR');
    });
  });
});
