'use strict';

const moment = require('moment');

module.exports = {
  updateStory: function(story, db) {
    return db.query("UPDATE stories SET title = '" + story.title + "', description = '" + story.description + "', last_updated = '" + moment().format('YYYY-MM-DD HH:mm:ss') + "', age_restricted = '" + story.age_restricted + "' WHERE id = ?", story.id)
    .then(function(res) {
      if (res.affectedRows == 1) {
        return "Story Has Been Updated";
      }
    })
    .catch(function(error) {
      return {
        log: "error",
        send: true,
        msg: "An internal error has occurred"
      };
    });
  }
};
