'use strict';

module.exports = {
  insertNewStory: function(story, user, db) {
    return db.query("INSERT INTO stories SET ?", {user_id: user.id, title: story.title, description: story.description, age_restricted: story.age_restricted || false})
    .then(function(response) {
      if (response && response.affectedRows === 1) {
        return response.insertId;
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
