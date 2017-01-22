/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect;

let db,
    chapter = {},
    response = {};

function deletePage(page_id, db) {
  return db.query("DELETE FROM pages WHERE id = ?", page_id)
  .then(function(res) {
    if (res.affectedRows == 1) {
      response.msg = "Page Was Deleted";
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

describe ('Delete page row from table:', function() {
  let page_id;

  beforeEach(function() {
    page_id = 1;
  });

  before(function() {
    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it ('deletes row where id matches page_id and returns success msg', function() {
    return deletePage(page_id, db)
    .then(function(res) {
      expect(res.msg).to.equal("Page Was Deleted");
    });
  });

  it ('throws error if cannot find page to delete', function() {
    page_id = 9999;
    return deletePage(page_id, db)
    .catch(function(error) {
      expect(error.msg).to.equal('An internal error has occurred');
    });
  });

  after(function() {
    return db.query("INSERT INTO pages SET ?", {id: 1, chapter_id: 5, path: "18eac3a7"});
  });
});
