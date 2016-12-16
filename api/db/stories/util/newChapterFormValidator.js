'use strict';

const validator = require('validator');

module.exports = function newStoryFormValidator(data) {
  var response = {};

  if (validator.isNull(data.title)) {
    response.incomplete = 'All fields mandatory';
  }

  if (!validator.isLength(data.title, {min: 1, max: 100})) {
    response.invalidTitle = "Title cannot contain more than 100 characters.";
  }

  return response;
};
