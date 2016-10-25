'use strict';

const validator = require('validator');

module.exports = function newStoryFormValidator(data) {
  var response = {};

  if (validator.isNull(data.title) || (validator.isNull(data.description))) {
    response.incomplete = 'All fields mandatory';
  }

  if (!validator.isLength(data.title, {min: 1, max: 100})) {
    response.invalidTitle = "Title cannot contain more than 100 characters.";
  }

  if (!validator.isLength(data.description, {min: 1, max: 300})) {
    response.invalidDescription = "Description cannot contain more than 300 characters.";
  }

  return response;
};
