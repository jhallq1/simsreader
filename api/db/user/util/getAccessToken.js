module.exports = {
  getAccessToken: function (email, db) {
    return db.query("SELECT * FROM `members` WHERE `email` = ?", email)
    .then(function(res) {
      return res[0].verification_token;
    })
    .catch(function(error) {
      return {
        log: "error",
        send: true,
        msg: "Cannot find email"
      };
    });
  }
};
