'use strict';

const AWS = require('aws-sdk'),
      secrets = require('../aws.json');

let s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  secretAccessKey: secrets.secretAccessKey,
  accessKeyId: secrets.accessKeyId,
  region: secrets.region
});

var params = {Bucket: 'simsreader', Body: ''};

let addPageKey = module.exports = function(key, assets_path, story_id, chapter_id) {
  let path1 = assets_path.substr(0, 8);
  let path2 = assets_path.substr(9, 8);
  params.Key = `users/${path1}/${path2}/${story_id}/${chapter_id}/${key}`;
  return new Promise(function(resolve, reject) {
    return s3.putObject(params, function(error, res) {
      if (error) {
        return reject(error);
      }
      return resolve(res);
    });
  });
};
