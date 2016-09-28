app.controller('resetPasswordController', ['$http', 'Notification', 'locationService', '$scope', 'userService', '$window', '$routeParams', function($http, Notification, locationService, $scope, userService, $window, $routeParams) {

  $http.get(locationService.origin + "/resetPassword/" +  $routeParams.passwordToken)
  .catch(function() {
    Notification.error("An internal error has occurred.");
    $window.location.href = '/index.html';
  });

  $scope.$watch('userService.isloggedin()', function(newVal, oldVal) {
    if (userService.isloggedin()) {
      $window.location.href = '/index.html';
    }
  });

  $scope.isMatch = function() {
    return $scope.password && $scope.passwordMatch === $scope.password && $scope.password.length > 7 ? true : false;
  };

  $scope.submitForm = function(isValid) {
    if (isValid) {
      $http({
        method: 'POST',
        url: locationService.origin + '/resetPassword',
        withCredentials: true,
        data: {
          username: $scope.username,
          email: $scope.email,
          tempPassword: $scope.tempPassword,
          password: $scope.password,
          passwordMatch: $scope.passwordMatch,
          token: $routeParams.passwordToken
        }
      })
      .then(function(res) {
        if (res.data && res.data.items && res.data.items.status) {
          Notification.success(res.data.msg);
          $scope.showSuccessMsg = true;
        } else {
          Notification.error(res.data.msg);
        }
      })
      .catch(function(err) {
        if (err.status === 401) {
          $window.location.href = '/index.html';
          Notification.error("Cannot reset password while logged in. That's silly.");
        }
      });
    } else {
      Notification.error("Form has invalid fields");
    }
  };
  }
]);
