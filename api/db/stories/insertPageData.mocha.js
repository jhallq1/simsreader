/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect;

let response = {};

function insertPages(pages, db) {
  let values = pages.map(function(a) {return [a.id, a.chapter_id, a.caption, a.path];});
  return db.query(`INSERT INTO pages (id, chapter_id, caption, path) VALUES ?`, [values])
  .then(function(res) {
    if (res.affectedRows > 0) {
      return res;
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

describe ('Inserts page data into table:', function() {
  let path, id, db, pages = [];

  beforeEach(function() {
    pages = [
      {
        id: 1,
        chapter_id: 5,
        caption: "First caption",
        path: "First path"
      },
      {
        id: 2,
        chapter_id: 5,
        caption: "Second caption",
        path: "Second path"
      },
      {
        id: 3,
        chapter_id: 5,
        caption: "Third caption",
        path: "Third path"
      }
    ];
  });

  before(function() {
    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('inserts values from pages array into new rows', function() {
    return insertPages(pages, db)
    .then(function(res) {
      expect(res.affectedRows).to.equal(3);
    });
  });

  after(function() {
    db.query('DELETE FROM pages WHERE ?', {chapter_id: 5});
  });
});
