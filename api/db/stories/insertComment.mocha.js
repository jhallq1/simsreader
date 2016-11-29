/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect;

function insertComment(userID, chapterID, comment, db) {
  return db.query("INSERT INTO comments SET ?", {user_id: userID, chapter_id: chapterID, text: comment.text, rating: comment.rating})
  .then(function(response) {
    if (response && response.affectedRows === 1) {
      return response.insertId;
    }
  })
  .catch(function(error) {
    throw {
      log: "error",
      send: true,
      msg: "An internal error has occurred"
    };
  });
}

describe ('Inserts comment data into table', function() {
  let db,
      response,
      userID = "",
      chapterID = "",
      comment = {};

  beforeEach(function() {
    userID = 43;
    chapterID = 11;
    comment.text = "Great job! What a cool story!";
    comment.rating = 3;

    return require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js').connect()
    .then(function(connection) {
      db = connection;
      return db;
    });
  });

  it('returns insertID if successfully adds data to table', function() {
    return insertComment(userID, chapterID, comment, db)
    .then(function(response) {
      expect(typeof response).to.equal('number');
    });
  });

  it('throws error if cannot add data to table', function() {
    comment.text = "Blah blah";
    comment.rating = null;
    return insertComment(userID, chapterID, comment, db)
    .catch(function(error) {
      expect(error.msg).to.equal('An internal error has occurred');
    });
  });

  after(function() {
    return db.query("DELETE FROM comments WHERE user_id = 43");
  });
});
