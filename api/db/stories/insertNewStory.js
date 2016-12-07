'use strict';

module.exports = {
  insertNewStory: function(story, user, db) {
    console.log(story, user);
    return db.query("INSERT INTO stories SET ?", {user_id: user.id, title: story.title, description: story.description})
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
