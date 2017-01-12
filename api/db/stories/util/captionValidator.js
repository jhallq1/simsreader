'use strict';

const validator = require('validator');

module.exports = function captionValidator(data) {
  let response = {};

  for (let i = 0; i < data.length; i++) {
    if (!validator.isLength(data[i].text, {min: 1, max: 9999})) {
      response.invalidCaption = "Missing caption";
    }
    return response;
  }
};
