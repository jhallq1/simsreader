'use strict';

const AWS = require('aws-sdk'),
      logger = require('../../logger.js'),
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

module.exports = function(delete_imgs_array) {
  params.Delete = {Objects: delete_imgs_array};

  return s3.deleteObjects(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      return logger.error(err);
    }

    logger.info(data);
    return;
  });
};
