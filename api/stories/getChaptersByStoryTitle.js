'use strict';

const getStoryId = require('../db/stories/getStoryIdByTitle.js'),
      getChaptersById = require('../db/stories/getChaptersByStoryId.js');

function getChaptersByStoryTitle(story_title, user_id, db) {
  return getStoryId.getStoryId(story_title, user_id, db)
  .then(function(res) {
    if (typeof res === 'number') {
      return getChaptersById.getChaptersByStoryId(res, db);
    }
  })
  .then(function(res) {
    if (res.length) {
      return res;
    }
  })
  .catch(function(error) {
    throw error;
  });
}

module.exports = {
  getChaptersByStoryTitle: getChaptersByStoryTitle
};
