const expect = require('chai').expect,
      validator = require('validator');

data = {};
msg = "";
response = {};

function formCompleted(data) {
  if (validator.isNull(data.email) || (validator.isNull(data.tempPassword)) || validator.isNull(data.password)) {
    response.incomplete = 'All fields mandatory';
    return;
  }
  return 'All fields completed';
}

function emailValid(data) {
  if (validator.isEmail(data.email.toLowerCase())) {
    data.email = data.email.toLowerCase();
    msg = "Email is valid";
  } else {
    response.invalidEmail = "Must enter valid email";
  }
  return;
}

function tempPwValid() {
  if (validator.isLength(data.tempPassword, {min: 8})) {
    msg = "Temporary password is valid";
  } else {
    response.invalidPw = "Please enter the temporary password that was emailed to you";
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

var loginValidator = {
  formCompleted: formCompleted,
  emailValid: emailValid,
  tempPwValid: tempPwValid,
  pwValid: pwValid
};

describe ('resetPw Form Validator:', function() {
  beforeEach(function() {
    data = {
      email: "abc@test.com",
      tempPassword: "temptemp",
      password: "reader12"
    };

    msg = "";
    response = {};
  });

  it ('verifies no fields are empty', function() {
    expect(loginValidator.formCompleted(data)).to.equal("All fields completed");
  });

  it ('throws an error if a field is empty', function() {
    data.password = "";
    loginValidator.formCompleted(data);
    expect(response.incomplete).to.equal("All fields mandatory");
  });

  it ('allows standard formatted emails', function() {
    loginValidator.emailValid(data);
    expect(msg).to.equal("Email is valid");
  });

  it ('throws an error if the email is invalid', function() {
    data.email = "blahblahblah.com";
    loginValidator.emailValid(data);
    expect(response.invalidEmail).to.equal("Must enter valid email");
  });

  it ('allows temp password of length greater than 7', function() {
    loginValidator.tempPwValid(data);
    expect(msg).to.equal("Temporary password is valid");
  });

  it ('throws error if temp password less than 8 characters', function() {
    data.tempPassword = "test";
    loginValidator.tempPwValid(data);
    expect(response.invalidPw).to.equal("Please enter the temporary password that was emailed to you");
  });

  it ('allows new password of length greater than 7', function() {
    loginValidator.pwValid(data);
    expect(msg).to.equal("Password is valid");
  });

  it ('throws error if new password less than 8 characters', function() {
    data.password = "test";
    loginValidator.pwValid(data);
    expect(response.invalidPw).to.equal("Password must have at least 8 characters");
  });

});
