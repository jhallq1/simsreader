'use strict';

const AWS = require('aws-sdk'),
      secrets = require('../aws.json');

let s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  secretAccessKey: secrets.secretAccessKey,
  accessKeyId: secrets.accessKeyId,
  region: secrets.region
}),
params = {
  Bucket: 'simsreader',
};

module.exports = function(assets_path, story_id, chapter_id) {
  params.Key = `users/${assets_path.substr(0, 8)}/${assets_path.substr(9, 8)}/stories/${story_id}/${chapter_id}/pages/`;

  s3.deleteObjects(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);
  });
};
