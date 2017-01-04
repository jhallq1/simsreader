'use strict';

const expect = require('chai').expect,
      validator = require('validator');

let data = {};
let msg = "";
let response = {};

function captionValid(data) {
  for (let i = 0; i < data.length; i++) {
    if (validator.isLength(data[i].caption, {min: 1, max: 9999})) {
      response.msg = "Comment field is valid";
    } else {
      response.msg = "Missing caption";
      return;
    }
  }
}

describe('Validates captions have length', function() {
  beforeEach(function() {
    data = [
      {
        id: 1,
        chapter_id: 5,
        caption: "First caption",
        path: "First path"
      },
      {
        id: 2,
        chapter_id: 5,
        caption: "Second caption",
        path: "Second path"
      },
      {
        id: 3,
        chapter_id: 5,
        caption: "Third caption",
        path: "Third path"
      }
    ];

    msg = "";
    response = {};
  });

  it('verifies that all caption keys have a value', function() {
    captionValid(data);
    expect(response.msg).to.equal("Comment field is valid");
  });

  it('throws error if a caption is missing', function() {
    data[1].caption = "";
    captionValid(data);
    expect(response.msg).to.equal("Missing caption");
  });
});
