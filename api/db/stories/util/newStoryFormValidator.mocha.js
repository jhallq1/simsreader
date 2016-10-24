const expect = require('chai').expect,
      validator = require('validator');

data = {};
msg = "";
response = {};

function formCompleted(data) {
  if (validator.isNull(data.title) || (validator.isNull(data.description))) {
    response.incomplete = "All fields required.";
    return;
  }
  return "All fields completed";
}

function titleValid(data) {
  if (validator.isLength(data.title, {min: 1, max: 15})) {
    msg = "Title is valid";
  } else {
    response.invalidTitle = "Title cannot contain more than 100 characters.";
  }
  return;
}

function descriptionValid(data) {
  if (validator.isLength(data.description, {min: 1, max: 30})) {
    msg = "Description is valid";
  } else {
    response.invalidDescription = "Description cannot contain more than 100 characters.";
  }
  return;
}

describe('Validates new story form data', function() {
  beforeEach(function() {
    data = {
      title: "Pol Roger",
      description: "Open sesame seeds please."
    };

    msg = "";
    response = {};
  });

  it('verifies no field is empty', function() {
    expect(formCompleted(data)).to.equal("All fields completed");
  });

  it('throws error if field is empty', function() {
    data.title = "";
    formCompleted(data);
    expect(response.incomplete).to.equal("All fields required.");
  });

  it('verifies that title is of valid length', function() {
    titleValid(data);
    expect(msg).to.equal("Title is valid");
  });

  it('throws error if title is too long', function() {
    data.title="Abra Cadabra World Peas Please";
    titleValid(data);
    expect(response.invalidTitle).to.equal("Title cannot contain more than 100 characters.");
  });

  it('verifies that description is of valid length', function() {
    descriptionValid(data);
    expect(msg).to.equal("Description is valid");
  });

  it('throws error if description is too long', function() {
    data.description = "12345678910 12345678910 12345678910";
    descriptionValid(data);
    expect(response.invalidDescription).to.equal("Description cannot contain more than 100 characters.");
  });
});
