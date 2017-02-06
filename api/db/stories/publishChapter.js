'use strict';

const moment = require('moment'),
      logger = require('../../logger.js');

let response = {
  log: 'info',
  send: true
};

module.exports = function(chapter_id, db) {
  return db.query("UPDATE chapters SET published = ?, last_updated = ? WHERE id = ?", [1, moment().format('YYYY-MM-DD HH:mm:ss'), chapter_id])
  .then(function(res) {
    if (res.affectedRows == 1) {
      response.msg = "Chapter Has Been Published";
      return response;
    }
  })
  .catch(function(error) {
    if (error) {
      logger.error(error);

      response.log = 'error';
      response.msg = 'Something went wrong.';
      return response;
    }

    throw error;
  });
};
