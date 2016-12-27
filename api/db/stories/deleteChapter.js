'use strict';

const expect = require('chai').expect;

let response = {};

module.exports = {
  deleteChapter: function(chapter_id, db) {
    return db.query("DELETE FROM chapters WHERE id = ?", chapter_id)
    .then(function(res) {
      if (res.affectedRows == 1) {
        response.msg = "Chapter Was Deleted";
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
};
