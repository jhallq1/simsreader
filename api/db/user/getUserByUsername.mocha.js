// 1. query the db
// 2. check for existing username
// 3. if username already exists, alert user
// 4. query db
// 5. check if new username exists
// 6. if exists, repeat 3-5
// 7. if unique, insert username into db

/* jslint node: true */
/* jshint esversion: 6 */

//console.log(__dirname);

const expect = require('chai').expect,
      db = require('E:\\Programming\\simsreader\\api\\db\\db.conn.mocha.js'),
      email = require('../user/getUserByEmail.js');


var username = "";

function getUserByUsername(username) {
    return new Promise(function(resolve, reject) {
      return db.conn.query("SELECT * FROM `members` WHERE `username` = ?", username, function(err, res) {
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

describe ('Username: db is connected', function() {
  it ('is connected', function() {
    expect(db.conn.state).to.equal('authenticated');
  });
});

describe ('Username: finds user by username', function() {
  beforeEach(function() {
    username = "mochalatte";
  });

  it ('returns first user', function() {
    return getUserByUsername(username)
    .then(function(res) {
      expect(res[0].username).to.equal('mochalatte');
    });
  });

  it('catches err if thrown', function() {
    username = null;
    return getUserByUsername(username)
    .catch(function(err) {
      expect(err.code).to.equal('ER_PARSE_ERROR');
    });
  });
});
