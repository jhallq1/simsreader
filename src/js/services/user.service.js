app.service('userService', ['$http', 'locationService', function($http, locationService) {

  let isloggedin = false,
      user = {};

  let _getIsLoggedIn = function() {
    return isloggedin || false;
  };

  let _setIsLoggedIn = function(bool) {
    isloggedin = bool;
  };

  let setUser = function(newUser) {
    user = {id: newUser.id, username: newUser.username, email: newUser.email} || {};
  };

  let getIsLoggedIn = function() {
    return $http({
      method: 'get',
      url: locationService.origin + '/isloggedin',
      withCredentials: true
    })
    .then(function(res) {
      if (res.data && res.data.items) {
        isloggedin = true;
        user = {
          id: res.data.items.id,
          username: res.data.items.username,
          email: res.data.items.email
        };
      } else {
        isloggedin = false;
        user = {};
      }
      return isloggedin;
    });
  };

  let getUserByEmail = function(email) {
    return $http({
      method: 'post',
      url: locationService.origin + '/getUserByEmail',
      withCredentials: true,
      data: {email: email}
    })
    .then(function(res) {
      user = res.data.items || {};
      return user;
    });
  };

  return {
    getIsLoggedIn: getIsLoggedIn,
    setIsLoggedIn: _setIsLoggedIn,
    isloggedin: _getIsLoggedIn,
    getUserByEmail: getUserByEmail,
    getUser: function() {
      return user;
    },
    setUser: setUser
  };
}]);
