'use strict';

const crypto = require('crypto'),
      addPageKey = require('../../aws/s3/addPageKey.js');

let response = {};

module.exports = {
  insertPages: function(pages, user, story_id, chapter_id, db) {
    for (let i = 0; i < pages.length; i++) {
      pages[i].chapter_id = chapter_id;
      pages[i].path = crypto.randomBytes(4).toString('hex');
      addPageKey(pages[i].path, user.assets_path, story_id, chapter_id);
    }

    let values = pages.map(function(a) {return [a.chapter_id, a.caption, a.path];});
    return db.query(`INSERT INTO pages (chapter_id, caption, path) VALUES ?`, [values])
    .then(function(res) {
      if (res.affectedRows > 0) {
        return pages.map(function(a) {return [a.path];});
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
