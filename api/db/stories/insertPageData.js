'use strict';

const crypto = require('crypto'),
      uploadImgs = require('../../aws/s3/uploadImgs.js');

let response = {};

function updateDb(captions, db) {
  let values = captions.map(function(a) {return [a.chapter_id, a.text, a.path];});

  return db.query(`INSERT INTO pages (chapter_id, caption, path) VALUES ?`, [values])
  .then(function(res) {
    if (res.affectedRows > 0) {
      return captions.map(function(a) {return [a.path];});
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

module.exports = {
  insertPages: function(files, story_id, chapter_id, captions, user, db) {
    if (files.length !== captions.length) throw "Image caption length mismatch";

    let file_name_parts;
    for (let i = 0; i < captions.length; i++) {
      captions[i].chapter_id = chapter_id;
      file_name_parts = files[i].originalname.split('.');
      captions[i].path = `${crypto.randomBytes(4).toString('hex')}.${file_name_parts[file_name_parts.length - 1]}`;
      files[i].path = captions[i].path;
    }

    let response = {
      data: captions,
      msg: "gj!"
    };

    return updateDb(captions, db)
    .then(function(res) {
      return uploadImgs(files, user.assets_path, story_id, chapter_id);
    })
    .then(function(res) {
      if (res > 0) {
        return res;
      }
    });
  }
};
