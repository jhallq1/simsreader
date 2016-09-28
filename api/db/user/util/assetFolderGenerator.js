'use strict';

const crypto = require('crypto'),
      secret = 'fishtank',
      fs = require('fs.extra');

module.exports = function makeDirp() {
  return new Promise(function(resolve, reject) {
    let buf = crypto.randomBytes(8).toString('hex');
    let path = [buf.slice(0, 8), buf.slice(8, 16)].join('/');

    return fs.mkdirp(__dirname + '../../../users/' + path, function (error) {
      if (error) {
        throw {
          log: "error",
          send: true,
          msg: "An internal error has occurred"
        };
      }
      return resolve(path);
    });
  })
  .catch(function(error) {
    throw error;
  });
};
