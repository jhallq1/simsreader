'use strict';

const getPagesByChapterId = require('../db/stories/getPagesByChapterId.js');

let response = {
  log: 'info',
  send: true
};

function getPages(user, story_id, chapter_id, db) {
  return getPagesByChapterId(chapter_id, db)
  .then(function(res) {
    if (res.length) {
      let imgUrls = [];
      let data = {};

      for (let i = 0; i < res.length; i++) {
        data.caption = res[i].caption;
        data.url = 'https://s3-us-west-2.amazonaws.com/simsreader/users/' + user.assets_path + '/stories/' + story_id + '/' + chapter_id + '/pages/' + res[i].path;
        imgUrls.push(data);
        data = {};
      }

      return imgUrls;
    }

    throw {
       log: "warn",
       send: true,
       msg: "Could not validate session",
       login: false
     };
  })
  .then(function(res) {
    if (res.length) {
      response.items = res;
      return response;
    }
  })
  .catch(function(error) {
    throw error;
  });
}

module.exports = {
  getPages: getPages
};
