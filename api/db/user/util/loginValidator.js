const validator = require('validator');

module.exports = function loginValidator(data) {
  var response = {};

  if (validator.isNull(data.email) || (validator.isNull(data.password))) {
    response.incomplete = 'All fields mandatory';
  }

  if (!validator.isEmail(data.email)) {
    response.invalidEmail = 'Please enter a valid email address';
  }

  if (!validator.isLength(data.password, {min: 8})) {
    response.invalidPw = 'Password must contain at least 8 characters';
  }

  return response;
};
