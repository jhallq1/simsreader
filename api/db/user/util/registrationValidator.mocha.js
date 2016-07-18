// need a function in tools folder to validate user registration paylod: test that no fields are null/empty strings/etc
// there are no special characters in username
// that email passes a comprehensive regex to resemble an email
// password is at least 8 characters
//
// if it fails it should throw an error with each incorrect field and why (ex:
// {
// response: {
// username: "Special characters are not allowed",
// password: "Must be at least 8 characters",
// etc...
// }
// }
//if passes resolves true

/* jslint node: true */
/* jshint esversion: 6 */
const expect = require('chai').expect,
      validator = require('validator');

data = {};
msg = "";

function formValidation(data, msg) {
  if (data.username.length === 0 || data.email.length === 0 || data.password.length === 0) {
    msg = "All fields mandatory";
  } else {
    msg = "All fields completed";
  }
  return msg;
}

function usernameValid(data, msg) {
  var alphaExp = /^[0-9a-zA-Z]+$/;
  if (data.username.match(alphaExp)) {
    msg = "Username is valid";
  } else {
    msg = "Username cannot contain special characters";
  }
  return msg;
}

function emailValid(data, msg) {
  var emailExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (data.email.match(emailExp)) {
    msg = "Email is valid";
  } else {
    msg = "Must submit valid email";
  }
  return msg;
}

function pwValid() {
  if (data.password.length > 7) {
    msg = "Password is valid";
  } else {
    msg = "Password must have at least 8 characters";
  }
  return msg;
}

describe ('Validates user registration form data /', function() {

  beforeEach(function() {
    data = {
      username: "test",
      email: "test@test.com",
      password: 'testtest'
    };

    msg = "";
  });

  it ('verifies no fields are empty', function() {
    expect(formValidation(data, msg)).to.equal("All fields completed");
  });

  it ('throws an error if a field is empty', function() {
    data.password = "";
    expect(formValidation(data, msg)).to.equal("All fields mandatory");
  });

  it ('checks for special chars in username', function() {
    expect(usernameValid(data, msg)).to.equal("Username is valid");
  });

  it ('throws an error if the username contains special chars', function() {
    data.username = "tes%2^*%t";
    expect(usernameValid(data, msg)).to.equal("Username cannot contain special characters");
  });

  it ('allows standard formatted emails', function() {
    expect(emailValid(data, msg)).to.equal("Email is valid");
  });

  it ('throws an error if the email is invalid', function() {
    data.email = "blahblahblah.com";
    expect(emailValid(data, msg)).to.equal("Must submit valid email");
  });

  it ('allows passwords length greater than 8', function() {
    expect(pwValid(data, msg)).to.equal("Password is valid");
  });

  it ('throws error if less than 8 characters', function() {
    data.password = "test";
    expect(pwValid(data, msg)).to.equal("Password must have at least 8 characters");
  });
});
