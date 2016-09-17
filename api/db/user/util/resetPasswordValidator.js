'use strict';

const validator = require('validator');

module.exports = function resetPasswordValidator(data) {
  var response = {};

  if (validator.isNull(data.email) || (validator.isNull(data.password))) {
    response.incomplete = 'All fields mandatory';
  }

  if (!validator.isEmail(data.email)) {
    response.invalidEmail = 'Please enter a valid email address';
  }

  if (!validator.isLength(data.tempPassword, {min: 8})) {
    response.invalidPw = 'Enter the temporary password that was emailed to you';
  }

  if (!validator.isLength(data.password, {min: 8})) {
    response.invalidPw = 'Your new password must contain at least 8 characters';
  }

  return response;
};
