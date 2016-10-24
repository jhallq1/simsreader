/* jslint node: true */
/* jshint esversion: 6 */
const expect = require('chai').expect,
      validator = require('validator');

data = {};
msg = "";
response = {};

function formCompleted(data) {
  if (validator.isNull(data.username) || (validator.isNull(data.email)) || (validator.isNull(data.password))) {
    response.incomplete = 'All fields mandatory';
    return;
  }
  return 'All fields completed';
}

function usernameValid(data) {
  if (validator.isAlphanumeric(data.username) && validator.isLength(data.username, {min: 4, max: 16})) {
    msg = "Username is valid";
  } else {
    response.invalidUsername = "Username must contain at least 4 characters and cannot contain special characters";
  }
  return;
}

function emailValid(data) {
  if (validator.isEmail(data.email.toLowerCase())) {
    data.email = data.email.toLowerCase();
    msg = "Email is valid";
  } else {
    response.invalidEmail = "Must submit valid email";
  }
  return;
}

function pwValid() {
  if (validator.isLength(data.password, {min: 8})) {
    msg = "Password is valid";
  } else {
    response.invalidPw = "Password must have at least 8 characters";
  }
  return;
}

function pwMatch() {
  if (data.password === data.passwordMatch) {
    msg = "Passwords match";
  } else {
    response.nomatch = "Passwords do not match";
  }
}

var registrationValidator = {
  formCompleted: formCompleted,
  usernameValid: usernameValid,
  emailValid: emailValid,
  pwValid: pwValid,
  pwMatch: pwMatch
};


describe ('Validates user registration form data', function() {

  beforeEach(function() {
    data = {
      username: "test",
      email: "tEsT111@TeSt.CoM",
      password: 'testtest',
      passwordMatch: 'testtest'
    };

    msg = "";

    response = {};
  });

  it ('verifies no fields are empty', function() {
    expect(registrationValidator.formCompleted(data)).to.equal("All fields completed");
  });

  it ('throws an error if a field is empty', function() {
    data.password = "";
    registrationValidator.formCompleted(data);
    expect(response.incomplete).to.equal("All fields mandatory");
  });

  it ('checks for min length and special chars in username', function() {
    registrationValidator.usernameValid(data);
    expect(msg).to.equal("Username is valid");
  });

  it ('throws an error if the username is shorter than 4 chars or contains special chars', function() {
    data.username = "tes%2^*%t";
    registrationValidator.usernameValid(data);
    expect(response.invalidUsername).to.equal("Username must contain at least 4 characters and cannot contain special characters");
  });

  it ('allows standard formatted emails', function() {
    registrationValidator.emailValid(data);
    expect(msg).to.equal("Email is valid");
  });

  it ('throws an error if the email is invalid', function() {
    data.email = "blahblahblah.com";
    registrationValidator.emailValid(data);
    expect(response.invalidEmail).to.equal("Must submit valid email");
  });

  it ('allows passwords length greater than 8', function() {
    registrationValidator.pwValid(data);
    expect(msg).to.equal("Password is valid");
  });

  it ('throws error if less than 8 characters', function() {
    data.password = "test";
    registrationValidator.pwValid(data);
    expect(response.invalidPw).to.equal("Password must have at least 8 characters");
  });

  it ('checks for matching passwords', function() {
    registrationValidator.pwMatch(data);
    expect(msg).to.equal("Passwords match");
  });

  it ('throws error if passwords do not match', function() {
    data.passwordMatch = "testtesc";
    registrationValidator.pwMatch(data);
    expect(response.nomatch).to.equal("Passwords do not match");
  });
});
