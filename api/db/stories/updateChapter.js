'use strict';

const moment = require('moment');

let response = {};

module.exports = {
  updateChapter: function(chapter, db) {
    return db.query('UPDATE chapters SET title = ?, last_updated = ? WHERE id = ?', [chapter.chapter_title, moment().format('YYYY-MM-DD HH:mm:ss'), chapter.chapter_id])
    .then(function(res) {
      if (res.affectedRows == 1) {
        return res;
      }
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
