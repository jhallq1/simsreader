'use strict';

const updateStory =  require('../db/stories/updateStory.js'),
      storyFormValidator = require('../db/stories/util/newStoryFormValidator.js');

let response = {
  log: 'info',
  send: true
};

function editStoryById(story, db) {
  let data = storyFormValidator(story);
  if (Object.keys(data).length > 0) {
    response.msg = data;
    return Promise.reject({
       log: "warn",
       send: true,
       msg: response.msg,
       validation: false
     });
  }

  return updateStory.updateStory(story, db)
  .then(function(res) {
    if (res.affectedRows === 1) {
      response.msg = "Changes were saved";
      return response;
    }
  })
  .catch(function(error) {
    throw error;
  });
}

module.exports = {
  editStoryById: editStoryById
};
