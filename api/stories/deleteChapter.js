'use strict';

const deleteChapter =  require('../db/stories/deleteChapter.js');

let response = {
  log: 'info',
  send: true
};

function deleteChapterByID(chapter_id, db) {
  return deleteChapter.deleteChapter(chapter_id, db)
  .then(function(res) {
    response.msg = "This chapter was deleted";
    return response;
  })
  .catch(function(error) {
    throw error;
  });
}

module.exports = {
  deleteChapterByID: deleteChapterByID
};
