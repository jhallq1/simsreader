// 1. query the db
// 2. check for existing email
// 3. if email already exists, alert user
// 4. check for existing username
// 5. if username is already taken, alert username
// 6. encrypt pw
// 7. insert username and email and pw
// 8. alert user

/* jslint node: true */
/* jshint esversion: 6 */
const expect = require('chai').expect,
      db = require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js');

email = "";

function getUserByEmail() {
  return new Promise(function(resolve, reject) {
    return db.conn.query("SELECT * FROM `members` WHERE `email` = ?", email, function(err, res) {
      if (err) {
        return reject(err);
      }

      return resolve(res);
    });
  })
  .catch(function(err) {
    throw err;
  });
}

describe ('Register: db is connected', function() {
  it ('is connected', function() {
    expect(db.conn.state).to.equal('authenticated');
  });
});

describe ('Finds user by email', function() {
  beforeEach(function() {
    email = "abc@test.com";
  });

  it ('returns first user', function() {
    return getUserByEmail()
    .then(function(res) {
      expect(res[0].email).to.equal('abc@test.com');
    });
  });

  it('catches err if thrown', function() {
    email = null;
    return getUserByEmail()
    .catch(function(err) {
      expect(err.code).to.equal('ER_PARSE_ERROR');
    });
  });
});
