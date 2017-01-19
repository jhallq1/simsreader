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
      Bucket: 'simsreader'
    },
    s3url;

function encode(data) {
  var str = data.reduce(function(a,b){ return a+String.fromCharCode(b); },'');
  return data(str).replace(/.{76}(?=.)/g,'$&\n');
}

module.exports = function() {
  s3.getObject({Key: 'happy-face.jpg'},function(err,file){

    setTimeout(function(){
        s3url = "data:image/jpeg;base64," + encode(file.Body);
    },1);
  });

};
