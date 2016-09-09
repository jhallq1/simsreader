const phs = require('password-hash-and-salt');

function hashPass(password) {
  return new Promise(function(resolve, reject) {
    return phs(password).hash(function(error, hash) {
      if (error) {
        throw {
          log: "error",
          send: true,
          status: 501,
          msg: "Internal error has occurred"
        };
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
      if (error) {
        reject({
          log: "error",
          send: false,
          msg: error
        });
      }

      if (!verified) {
        reject({
          log: "info",
          send: true,
          msg: "Invalid login information"
        });
      }
      return resolve(true);
    });
  })
  .catch(function(error) {
    throw error;
  });
}

module.exports = {
  hashPass: hashPass,
  verifyHash: verifyHash
};
