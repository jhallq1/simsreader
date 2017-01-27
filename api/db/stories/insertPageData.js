'use strict';

const crypto = require('crypto'),
      uploadImgs = require('../../aws/s3/uploadImgs.js'),
      deleteImgs = require('../../aws/s3/deleteImgs.js'),
      getS3List = require('../../aws/s3/getList.js');

let response = {};

function updateDb(captions, db) {
  let values = captions.map(function(a) {return [a.chapter_id, a.text, a.path];});

  return db.query(`INSERT INTO pages (chapter_id, caption, path) VALUES ?`, [values])
  .then(function(res) {
    if (res.affectedRows > 0) {
      return captions.map(function(a) {return a.path;});
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

function delete_old_imgs(user_path, list, paths, story_id, chapter_id) {
  let delete_imgs = [];

  for (let kk = 0; kk < paths.length; kk++) {
    if (list[kk] && paths.indexOf(list[kk]) === -1) {
      delete_imgs.push({Key: `users/${user_path.substr(0, 8)}/${user_path.substr(9, 8)}/stories/${story_id}/${chapter_id}/pages/${list[kk]}`});
    }
  }

  if (delete_imgs.length === 0) return;

  deleteImgs(delete_imgs);
}

module.exports = {
  insertPages: function(imgData, story_id, chapter_id, captions, files, user, db) {
    if (!files) files = [];
    if (!imgData) imgData = [];

    let file_name_parts;
    for (let i = 0; i < captions.length; i++) {
      captions[i].chapter_id = chapter_id;

      if (files[i] && files[i].url) {
        captions[i].path = files[i].url.split('/').pop();
        delete captions[i].page_id;
      } else if (!captions[i].page_id) {
        let tmp_imgData = imgData.shift();
        file_name_parts = tmp_imgData.originalname.split('.');
        captions[i].path = `${crypto.randomBytes(4).toString('hex')}.${file_name_parts.pop()}`;
        tmp_imgData.path = captions[i].path;
        imgData.push(tmp_imgData);
      }
    }

    return updateDb(captions, db)
    .then(function(paths) {
      return getS3List(user.assets_path, story_id, chapter_id)
      .then(function(list) {
        delete_old_imgs(user.assets_path, list, paths, story_id, chapter_id);
        return list;
      });
    })
    .then(function(list) {
      return uploadImgs(imgData, user.assets_path, story_id, chapter_id);
    })
    .then(function(res) {
      if (!res) throw "an internal error has occured";
      return res;
    })
    .catch(function(error) {
      throw error;
    });
  }
};
