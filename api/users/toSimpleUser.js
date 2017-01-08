module.exports = function toSimpleUser(user) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    registration_date: user.registration_date,
    last_login: user.last_login,
    assets_path: user.assets_path
  };
};
