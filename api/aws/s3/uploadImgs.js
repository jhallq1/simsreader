'use strict';

const AWS = require('aws-sdk'),
      secrets = require('../aws.json'),
      fs = require('fs');

let s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      secretAccessKey: secrets.secretAccessKey,
      accessKeyId: secrets.accessKeyId,
      region: secrets.region
    }),
    uploadParams = {
      Bucket: 'simsreader'
    };

function createImgPromise(file, assets_path, story_id, chapter_id) {
  uploadParams.Body = file.buffer;
  uploadParams.Metadata = {
    'Content-Type': file.mimetype
  };
  uploadParams.ContentEncoding = file.econding;
  uploadParams.Key = `users/${assets_path.substr(0, 8)}/${assets_path.substr(9, 8)}/stories/${story_id}/${chapter_id}/pages/${file.path}`;

  return s3.upload(uploadParams, function (err, data) {
    if (err) throw err;
  });
}

module.exports = function(files, assets_path, story_id, chapter_id) {
  let promises = [];
  for(let ii = 0; ii < files.length; ii++) {
    promises.push(createImgPromise(files[ii], assets_path, story_id, chapter_id));
  }

  return Promise.all(promises)
  .then(res => {
    return res.length;
  })
  .catch(err => {
    throw err;
  });
};
