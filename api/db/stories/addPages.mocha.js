// get the story hash, create empty array called promises.
// Then start looping over pages. Make a hash first. have two new functions
// (outside this loop/function! ) , one for inserting a page into db, one for
// uploading it to s3, put the hash onto the page obj and
// promises.push(Fn.db(page)) promises.push(fn.s3(page)) and after the loop
// pushed all the promises,
// call Promise.all(promises).then(fn(res){ array of responses })

'use strict';

const expect = require('chai').expect,
      crypto = require('crypto'),
      AWS = require('aws-sdk'),
      secrets = require('..aws/aws.json');

let pages, response;
let promises = [];
let s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  secretAccessKey: secrets.secretAccessKey,
  accessKeyId: secrets.accessKeyId,
  region: secrets.region
});

var uploadParams = {Bucket: 'simsreader', Key: '', Body: ''};

for (let i = 0; i < pages.length; i++) {
  pages[i].path = crypto.randomBytes(4).toString('hex');
}

function insertPageIntoDb(page, db) {
  return db.query(`INSERT INTO pages (chapter_id, caption, path) VALUES ?`, [page.chapter_id, page.caption, page.path])
  .then(function(res) {
    if (res.affectedRows > 0) {
      return res;
    }
    return response;
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

function uploadImg(files) {
  var file = process.argv[3];

  var fs = require('fs');
  var fileStream = fs.createReadStream(file);
  fileStream.on('error', function(err) {
    console.log('File Error', err);
  });
  uploadParams.Body = fileStream;

  var path = require('path');
  uploadParams.Key = path.basename(file);

  s3.upload (uploadParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    } if (data) {
      console.log("Upload Success", data.Location);
    }
  });
}

function addPages(pages, files, db) {
  for (let i = 0; i < pages.length; i++) {
    promises.push(insertPageIntoDb(pages, db));
    promises.push(uploadImg(files));
  }

  Promise.all(promises).then(function(res) {return res; });
}

describe ('Inserts page data into table:', function() {
  let path, id, db, pages = [];

  beforeEach(function() {
    pages = [
      {
        id: 1,
        chapter_id: 5,
        caption: "First caption",
        path: ""
      },
      {
        id: 2,
        chapter_id: 5,
        caption: "Second caption",
        path: ""
      },
      {
        id: 3,
        chapter_id: 5,
        caption: "Third caption",
        path: ""
      }
    ];
  });
});
