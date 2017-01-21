'use strict';

const getPagesByChapterId = require('../db/stories/getPagesByChapterId.js'),
      getChapterId = require('../db/stories/getChapterId.js'),
      getStoryId = require('../db/stories/getStoryIdByTitle.js');

let response = {
  log: 'info',
  send: true
};

function createImgArray(user, story_id, chapter_id, res) {
  if (res.length) {
    let imgUrls = [];
    let data = {};

    for (let i = 0; i < res.length; i++) {
      data.caption = res[i].caption;
      data.url = 'https://s3-us-west-2.amazonaws.com/simsreader/users/' + user.assets_path + '/stories/' + story_id + '/' + chapter_id + '/pages/' + res[i].path;
      imgUrls.push(Object.assign({}, data));
    }

    response.items = imgUrls;
    return response;
  }
}

function getPages(user, story_id, story_title, chapter_id, chapter_index, db) {
  if (chapter_id) {
    return getPagesByChapterId(user, story_id, chapter_id, db)
    .then(function(res) {
      return createImgArray(user, story_id, chapter_id, res);
    })
    .catch(function(error) {
      throw error;
    });
  } else {
    return getStoryId.getStoryId(story_title, user.id, db)
    .then(function(res) {
      if (typeof res === 'number') {
        story_id = res;
      }
    })
    .then(function() {
      return getChapterId.getChapterId(story_id, chapter_index, db);
    })
    .then(function(res) {
      if (typeof res === 'number') {
        chapter_id = res;
      }
    })
    .then(function() {
      return getPagesByChapterId(user, story_id, chapter_id, db);
    })
    .then(function(res) {
      return createImgArray(user, story_id, chapter_id, res);
    })
    .catch(function(error) {
      throw error;
    });
  }
}

module.exports = {
  getPages: getPages,
  createImgArray: createImgArray
};
