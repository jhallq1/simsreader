'use strict';

const updateChapter =  require('../db/stories/updateChapter.js'),
      chapterFormValidator = require('../db/stories/util/newChapterFormValidator.js');

let response = {
  log: 'info',
  send: true
};

function editChapterById(chapter, db) {
  let data = chapterFormValidator(chapter.chapter_title);
  if (Object.keys(data).length > 0) {
    response.msg = data;
    return Promise.reject({
       log: "warn",
       send: true,
       msg: response.msg,
       validation: false
     });
  }

  return updateChapter.updateChapter(chapter, db)
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
  editChapterById: editChapterById
};
