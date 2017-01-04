'use strict';

let response = {};

module.exports = {
  insertPages: function(pages, db) {
    let values = pages.map(function(a) {return [a.id, a.chapter_id, a.caption, a.path];});
    return db.query(`INSERT INTO pages (id, chapter_id, caption, path) VALUES ?`, [values])
    .then(function(res) {
      if (res.affectedRows > 0) {
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
