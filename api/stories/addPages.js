'use strict';

const captionValidator = require('../db/stories/util/captionValidator.js'),
      insertPages =  require('../db/stories/insertPageData.js'),
      validateSession = require('../db/user/sessionValidator.js'),
      deletePages = require('../db/stories/deletePagesById.js'),
      getStoryId = require('../db/stories/getStoryIdByTitle.js'),
      getChapterId = require('../db/stories/getChapterId.js'),
      publish = require('../db/stories/publishChapter.js'),
      logger = require('../logger.js');

let response = {
  log: 'info',
  send: true
};

function addPages(imgData, story_id, chapter_id, captions, files, user, sid, readyForPublish, db) {
  return deletePages.deletePagesByChapterId(chapter_id, db)
  .then(function() {
    if ((!files && !imgData) || (!files && imgData.length === 0)) {
        response.msg = "Your draft has been successfully saved.";
        response.data = [];
        return response;
    }
  })
  .then(function() {
    let data = captionValidator(captions);
    if (Object.keys(data).length > 0) {
      response.msg = data;
      return Promise.reject({
         log: "warn",
         send: true,
         msg: response.msg,
         validation: false
       });
    }

    return validateSession.sessionValidator(user, sid, db)
    .then(function(res) {
      if (res) {
        return insertPages.insertPages(imgData, story_id, chapter_id, captions, files, user, db);
      }
    })
    .then(function(res) {
      if (res && readyForPublish.toString() === "false") {
        response.items = res.data;
        response.msg = "Your draft has been successfully saved.";
        return response;
      } else if (res && readyForPublish.toString() === "true"){
        response.items = res.data;
        return publish(chapter_id, db)
        .then(function(res) {
          if (res) {
            response.msg = "Your chapter has been published. Good job!";
            return response;
          }
        });
      }
    })
    .catch(function(error) {
      if (error) logger.error(error);
    });
  });
}

function checkValues(imgData, story_id, story_title, chapter_id, chapter_index, captions, files, user, sid, readyForPublish, db) {
  if (typeof story_id === 'object' && typeof chapter_id === 'object') {
    story_id = story_id.id;
    chapter_id = chapter_id.id;
    return addPages(imgData, story_id, chapter_id, captions, files, user, sid, readyForPublish, db);
  } else if (!story_id && !chapter_id) {
    return getStoryId.getStoryId(story_title, user.id, db)
    .then(function(res) {
      story_id = res;
      return getChapterId.getChapterId(story_id, chapter_index, db)
      .then(function(res) {
        chapter_id = res;
        return addPages(imgData, story_id, chapter_id, captions, files, user, sid, readyForPublish, db);
      });
    });
  } else {
    return addPages(imgData, story_id, chapter_id, captions, files, user, sid, readyForPublish, db);
  }
}

module.exports = {
  checkValues: checkValues,
  addPages: addPages
};
