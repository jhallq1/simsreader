'use strict';

const validator = require('validator');

module.exports = function newStoryFormValidator(data) {
  var response = {};

  if (validator.isNull(data.title) || (validator.isNull(data.description))) {
    response.incomplete = 'All fields mandatory';
  }

  if (!validator.isLength(data.title, {min: 1, max: 100})) {
    response.invalidTitleLength = "Title cannot contain more than 100 characters.";
  }

  if (!validator.isWhitelisted(data.title, /^[a-zA-Z0-9\.\?\:\!\(\)\s]+$/)) {
    response.invalidTitle = "Title cannot contain underscores.";
  }

  if (!validator.isLength(data.description, {min: 1, max: 300})) {
    response.invalidDescription = "Description cannot contain more than 300 characters.";
  }

  return response;
};
