'use strict';

const moment = require('moment');

module.exports = {
  updateStory: function(story, db) {
    return db.query('UPDATE stories SET title = ?, description = ?, last_updated = ?, age_restricted = ? WHERE id = ?', [story.title, story.description, moment().format('YYYY-MM-DD HH:mm:ss'), story.age_restricted, story.id])
    .then(function(res) {
      if (res.affectedRows == 1) {
        return res;
      }
    })
    .catch(function(error) {
      throw {
        log: "error",
        send: true,
        msg: "An internal error has occurred"
      };
    });
  }
};
