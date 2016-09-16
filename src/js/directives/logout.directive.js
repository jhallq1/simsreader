app.directive('logout', ['userService', '$http', 'locationService', '$location', 'Notification', function(userService, $http, locationService, $location, Notification) {
  return {
    restrict: 'E',
    scope: {},
    template: "<a type=\"button\" class=\"btn btn-default logout-btn\" ng-click=\"logout()\">Logout</a>",
    link: function($scope, ele, attr) {
      $scope.logout = function() {
        $http({
          method: 'GET',
          url: locationService.origin + '/logout',
          withCredentials: true
        })
        .then(function(res) {
          if (userService.isloggedin()) {
            Notification.success("Logged out");
            $location.path('/home');
            userService.setIsLoggedIn(false);
            userService.setUser(res || {});
          }
        });
      };
    }
  };
}]);
