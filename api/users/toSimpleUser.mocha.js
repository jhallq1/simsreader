/*global describe, it, before, beforeEach, after, afterEach */

'use strict';

const expect = require('chai').expect;

function toSimpleUser(user) {
  let simplifiedUser = {
    username: user.username,
    email: user.email,
    bio: user.bio,
    last_login: user.last_login,
    registration_date: user.registration_date
  };

  return simplifiedUser;
}

describe ('return simple user obj:', function() {
  let simpleUser, user;

  before(function() {
    user = {
      username: "abba",
      email: "abba@test.com",
      bio: "abba the bot",
      last_login: "08/26/2016",
      registration_date: "04/03/2015",
      token: "ndfafa934nklfaf",
      id: 15,
      verified: true
    };

    simpleUser = {
      username: "abba",
      email: "abba@test.com",
      bio: "abba the bot",
      last_login: "08/26/2016",
      registration_date: "04/03/2015"
    };
  });

  it ('has a method called simpleUser', function() {
    expect(typeof toSimpleUser).to.equal("function");
  });

  it ('returns a simplified user obj', function() {
    expect(toSimpleUser(user)).to.deep.equal(simpleUser);
  });
});
