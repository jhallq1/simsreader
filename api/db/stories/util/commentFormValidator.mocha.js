const expect = require('chai').expect,
      validator = require('validator');

data = {};
msg = "";
response = {};

function formCompleted(data) {
  if (validator.isNull(data.comment) || (validator.isNull(data.rating))) {
    response.incomplete = "Both fields empty";
    return;
  }
  return "Form is complete";
}

function commentValid(data) {
  if (validator.isLength(data.comment, {min: 0, max: 250})) {
    msg = "Comment field is valid";
  } else {
    response.invalidComment = "Comment cannot contain more than 250 characters";
  }
  return;
}

describe('Validates comment form data', function() {
  beforeEach(function() {
    data = {
      comment: "Pol Roger",
      rating: "1"
    };

    msg = "";
    response = {};
  });

  it('verifies at least both fields have data', function() {
    expect(formCompleted(data)).to.equal("Form is complete");
  });

  it('throws error if a field is empty', function() {
    data.comment = "";
    data.rating = "";
    formCompleted(data);
    expect(response.incomplete).to.equal("Both fields empty");
  });

  it('verifies that text is of valid length', function() {
    commentValid(data);
    expect(msg).to.equal("Comment field is valid");
  });

  it('throws error if text is too long', function() {
    data.comment = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    commentValid(data);
    expect(response.invalidComment).to.equal("Comment cannot contain more than 250 characters");
  });
});
