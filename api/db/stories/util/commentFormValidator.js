'use strict';

const validator = require('validator');

module.exports = function commentFormValidator(data) {
  var response = {};

  if (validator.isNull(data.comment) && (validator.isNull(data.rating))) {
    response.incomplete = "Both fields empty";
  }

  if (!validator.isLength(data.comment, {min: 0, max: 250})) {
    response.invalidComment = "Comment cannot contain more than 250 characters";
  }

  return response;
};
