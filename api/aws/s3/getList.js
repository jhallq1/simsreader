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
  Delimiter: '/'
};

module.exports = function(assets_path, story_id, chapter_id) {
  params.Prefix = `users/${assets_path.substr(0, 8)}/${assets_path.substr(9, 8)}/stories/${story_id}/${chapter_id}/pages/`;

  return new Promise(function(resolve, reject) {
    return s3.listObjects(params, function(err, data) {
      if (err) return reject(err);

      let res = [];
      if (Object.keys(data).length > 0) {
        data.Contents.forEach(function(o) {
          let item = o.Key.split('/').pop();
          if (item && item.length > 0) res.push(item);
        });

        return resolve(res);
      }

      return resolve([]);
    });
  });
};
