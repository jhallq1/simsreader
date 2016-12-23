'use strict';

const moment = require('moment');

let response = {};

module.exports = {
  updateChapter: function(chapter, db) {
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
};
