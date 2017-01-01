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

let createUAK =

module.exports = function(key) {
  params.Key = `users/${key}/init`;
  return new Promise(function(resolve, reject) {
    return s3.putObject(params, function(error, res) {
      if (error) {
        return reject(error);
      }
      return resolve(res);
    });
  });
};
