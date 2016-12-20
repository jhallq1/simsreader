'use strict';

const deleteStory =  require('../db/stories/deleteStory.js');

let response = {
  log: 'info',
  send: true
};

function deleteStoryByID(story_id, db) {
  return deleteStory.deleteStory(story_id, db)
  .then(function(res) {
    response.msg = "This story was deleted";
    return response;
  })
  .catch(function(error) {
    throw error;
  });
}

module.exports = {
  deleteStoryByID: deleteStoryByID
};
