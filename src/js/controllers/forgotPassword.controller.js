app.controller('forgotPasswordController', ['$http', 'Notification', 'locationService', '$scope', 'userService', function($http, Notification, locationService, $scope, userService) {

  $scope.$watch('userService.isloggedin()', function(newVal, oldVal) {
    if (userService.isloggedin()) {
      $window.location.href = '/index.html';
    }
  });

  $scope.submitForm = function(isValid) {
    if (isValid) {
      $http({
        method: 'POST',
        url: locationService.origin + '/forgotPassword',
        withCredentials: true,
        data: {email: $scope.email}
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
          Notification.error("Cannot request temporary password while logged in. That's silly.");
        }
      });
    } else {
      Notification.error("Email address is invalid");
    }
  };
  }
]);
