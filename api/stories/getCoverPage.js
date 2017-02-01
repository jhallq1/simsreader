'use strict';

const getStoryByStoryId = require('../db/stories/getStoryByStoryId.js'),
      getUser = require('../db/user/getUsernameAndAssetsPath.js'),
      getChapters = require('../db/stories/getChaptersByStoryId.js'),
      getCoverPhoto = require('../db/stories/getCoverPhoto.js');

let response = {
  log: 'info',
  send: true
};

let story, chapter_id, assets_path;

module.exports = function(story_id, db) {
  return getStoryByStoryId(story_id, db)
  .then(function(res) {
    if (res) {
      story = res;
      return getUser(story.user_id, db)
      .then(function(res) {
        story.username = res.username;
        assets_path = res.assets_path;
        return getChapters.getChaptersByStoryId(story_id, db)
        .then(function(res) {
          story.numOfChapters = res.length;
          chapter_id = res[0].id;
          return getCoverPhoto(chapter_id, db)
          .then(function(res) {
            story.cover_photo = 'https://s3-us-west-2.amazonaws.com/simsreaderresized/resized-users/' + assets_path + '/stories/' + story_id + '/' + chapter_id + '/pages/' + res;
            response.story = story;

            return response;
          });
        });
      });
    } else {
      response = {
        log: "error",
        send: true,
        msg: "Invalid Story ID"
      };

      return response;
    }
  })
  .catch(function(error) {
    throw error;
  });
};
