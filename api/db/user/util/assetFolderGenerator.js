'use strict';

const crypto = require('crypto'),
      secret = 'fishtank',
      fs = require('fs.extra');

module.exports = function makeDirp() {
    let buf = crypto.randomBytes(8).toString('hex');
    let path = [buf.slice(0, 8), buf.slice(8, 16)].join('/');

    return Promise.resolve(path);
};
