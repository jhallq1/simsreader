'use strict';

const captionValidator = require('../db/stories/util/captionValidator.js'),
      insertPages =  require('../db/stories/insertPageData.js'),
      validateSession = require('../db/user/sessionValidator.js'),
      deletePage = require('../db/stories/deletePageById.js'),
      getStoryId = require('../db/stories/getStoryIdByTitle.js'),
      getChapterId = require('../db/stories/getChapterId.js');

let response = {
  log: 'info',
  send: true
},
saved_msg = "Your draft has been successfully saved";

function addPages(imgData, story_id, story_title, chapter_id, chapter_index, captions, deleted, files, user, sid, db) {
  return deletePage.deletePageByChapterId(chapter_id, db)
  .then(function() {
    if ((!files && !imgData) || (!files && imgData.length === 0)) {
        response.msg = saved_msg;
        response.data = [];
        return response;
    }

    if (!story_id && story_title) {
      return getStoryId.getStoryId(story_title, user.id, db)
      .then(function(res) {
        if (res) {
          story_id = res;
        }
      })
      .then(function() {
        return getChapterId.getChapterId(story_id, chapter_index, db)
        .then(function(res) {
          if (res) {
            chapter_id = res;
          }
        })
        .then(function() {
          //TODO: move to top of this
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

            throw {
               log: "warn",
               send: true,
               msg: "Could not validate session",
               login: false
             };
          })
          .then(function(res) {
            if (res) {
              response.items = res.data;
              response.msg = saved_msg;
              return response;
            }
          })
          .catch(function(error) {
            console.log(error);
            throw error;
          });
        });
      });
    } else {
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

        throw {
           log: "warn",
           send: true,
           msg: "Could not validate session",
           login: false
         };
      })
      .then(function(res) {
        if (res) {
          response.items = res.data;
          response.msg = "Your draft has been successfully saved";
          return response;
        }
      })
      .catch(function(error) {
            console.log(error)
        throw error;
      });
    }
  })
  .catch(function(error) {
    console.log(error)
    throw error;
  });
}

module.exports = {
  addPages: addPages
};
