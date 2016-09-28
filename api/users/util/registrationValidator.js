/* jslint node: true */
/* jshint esversion: 6 */

const validator = require('validator');

function registrationValidator(data) {
  var response = {};

  if (validator.isNull(data.username) || (validator.isNull(data.email)) || (validator.isNull(data.password))) {
    response.incomplete = 'All fields mandatory';
  }

  if (!validator.isAlphanumeric(data.username)) {
    response.invalidUsernameAlpha = "Username cannot contain special characters";
  }

  if (!validator.isLength(data.username, {min: 4, max: 16})) {
    response.invalidUsernameLength = "Username length must be between 4 and 16 characters";
  }

  if (!validator.isEmail(data.email)) {
    response.invalidEmail = "Must submit valid email";
  }

  if (!validator.isLength(data.password, {min: 8})) {
    response.invalidPw = "Password must contain at least 8 characters";
  }

  if (data.password !== data.passwordMatch) {
    response.nomatch = "Passwords do not match";
  }

  return response;
}

module.exports = {
  registrationValidator: registrationValidator
};
