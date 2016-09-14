app.directive('login', ['$http', 'Notification', 'locationService', 'userService', function($http, Notification, locationService, userService) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'views/loginView.html',
    link: function($scope, ele, attr) {
      $scope.submitForm = function(form) {
        if (!form) {
          return;
        }
        $http({
          method: 'POST',
          url: locationService.origin + '/login',
          data: {
            email: $scope.email,
            password: $scope.password
          },
          withCredentials: true
        })
        .then(function(res) {
          if (res.data && res.data.items && res.data.items.login) {
            Notification.success(res.data.msg);
            userService.setIsLoggedIn(true);
            userService.setUser(res.data.items.user);
          } else {
            Notification.error(res.data.msg);
            userService.setIsLoggedIn(false);
          }
        });
      };
    }
  };
}]);
