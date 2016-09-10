/*******************
*@param type_id: 1
/******************/

module.exports = function checkEmailSent(user, type_id, db) {
  return db.query("SELECT COUNT(*) FROM email WHERE email = ? AND type_id = ?", [user.email, type_id])
  .then(function(res) {
    return res[0]['COUNT(*)'] > 0 ? true : false;
  })
  .catch(function(error) {
    throw error;
  });
};
