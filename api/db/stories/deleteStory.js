'use strict';

module.exports = {
  deleteStory: function (story_id, db) {
    return db.query("DELETE FROM stories WHERE id = ?", story_id)
    .catch(function(error) {
      return {
        log: "error",
        send: true,
        msg: "An internal error has occurred"
      };
    });
  }
};
