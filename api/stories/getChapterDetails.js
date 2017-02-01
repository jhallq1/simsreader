'use strict';

const getPages = require('../db/stories/getPagesByChapterId.js'),
      getStory = require('../db/stories/getStoryByStoryId.js'),
      getAssetsPath = require('../db/user/getUsernameAndAssetsPath.js'),
      getChapters = require('../db/stories/getChaptersByStoryId.js');

let user_id, assets_path, chapter;

let response = {
  log: 'info',
  send: true
};

function createImgArray(assets_path, story_id, chapter_id, res) {
  if (res.length) {
    let imgUrls = [];
    let data = {};

    for (let i = 0; i < res.length; i++) {
      data.id = res[i].id;
      data.caption = res[i].caption;
      data.url = 'https://s3-us-west-2.amazonaws.com/simsreaderresized/resized-users/' + assets_path + '/stories/' + story_id + '/' + chapter_id + '/pages/' + res[i].path;
      imgUrls.push(Object.assign({}, data));
    }
    response.pageData = imgUrls;
    response.story_id = story_id;
    response.chapter = chapter;
    return response;
  }
}

function getChapterDetails(story_id, chapter_index, db) {
  return getStory(story_id, db)
  .then(function(res) {
    user_id = res.user_id;
    return getAssetsPath(user_id, db)
    .then(function(res) {
      assets_path = res.assets_path;
      return getChapters.getChaptersByStoryId(story_id, db)
      .then(function(res) {
        chapter = res[chapter_index - 1];
        return getPages(story_id, chapter.id, db)
        .then(function(res) {
          return createImgArray(assets_path, story_id, chapter.id, res);
        });
      });
    });
  });
}

module.exports = {
  getChapterDetails: getChapterDetails,
  createImgArray: createImgArray
};
