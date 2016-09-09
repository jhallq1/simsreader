'use strict';

const expect = require('chai').expect,
      phs = require('password-hash-and-salt');

function hashPass(password) {
  return new Promise(function(resolve, reject) {
    return phs(password).hash(function(error, hash) {
      if (error) {
        return reject({
          log: "error",
          send: true,
          status: 501,
          msg: "Internal error has occurred"
        }
      );
    }
      return resolve(hash);
    });
  })
  .catch(function(error) {
    throw error;
  });
}

function verifyHash(password, dbPassword) {
  return new Promise(function(resolve, reject) {
    return phs(password).verifyAgainst(dbPassword, function(error, verified) {
      if(error) {
        throw {
          log: "warn",
          send: true,
          msg: "Invalid password"
        };
      }
      return resolve(true);
    });
  })
  .catch(function(error) {
    throw error;
  });
}

describe ('encrpyt: seasons the password', function() {
  let password;

  it ('gives password flava', function() {
    return hashPass('blahblahpotato')
    .then(function(hash) {
      expect(hash).to.have.lengthOf(270);
    });
  });

  it ('catches error if thrown', function() {
    password = null;
    return hashPass()
    .catch(function(error) {
      expect(error.status).to.equal(501);
    });
  });
});

describe ('verifies hash', function() {
  let mold;
  let password;

  it ('verifies that user password matches db password', function() {
    password = "hotpotato";
    return hashPass(password)
    .then(function(hashed) {
      return verifyHash(password, hashed);
    })
    .then(function(res) {
      expect(res).to.equal(true);
    });
  });

  it ('catches error if thrown', function() {
    password = "coldpotato";
    mold = "aaaaaaaaaaaaaaaaaaaa";
    return verifyHash(password, mold)
    .catch(function(error) {
      expect(error.msg).to.equal("Invalid password");
    });
  });
});
