module.exports = function toSimpleUser(user) {
  return {
    username: user.username,
    email: user.email,
    bio: user.bio,
    last_login: user.last_login,
    registration_date: user.registration_date
  };
};
