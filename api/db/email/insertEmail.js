/*******************************
*@param verification type_id: 1
*@param pw recovery type_id: 2
/******************************/
module.exports = function insertEmail(user, type_id, db) {
  return db.query("INSERT INTO email SET ?", {user_id: user.id, type_id: type_id, email: user.email})
  .then(function(response) {
    if (response.affectedRows === 1) {
      return true;
    }
  })
  .catch(function(error) {
    throw error;
  });
};
