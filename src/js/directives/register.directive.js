app.directive('register', ['$http', 'Notification', 'locationService', function($http, Notification, locationService) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'views/registerForm.html',
    link: function($scope, ele, attr) {
      $scope.submitForm = function(isValid) {
        if (isValid) {
          $http({
            method: 'POST',
            url: locationService.origin + '/register',
            data: {username: $scope.username, email: $scope.emailAddress, password: $scope.password, passwordMatch: $scope.passwordMatch}
          })
          .then(function(res) {
            if (res.data && res.data.items && res.data.items.status) {
              Notification.success(res.data.msg);
              $scope.showSuccessMsg = true;
            } else {
              Notification.error(res.data.msg);
            }
          });
        } else {
          Notification.error("Registration form has invalid fields");
        }
      };
      $scope.isMatch = function() {
        if ($scope.password && $scope.passwordMatch === $scope.password && $scope.password.length > 7) {
          return true;
        } else {
          return false;
        }
      };
    }
  };
}]);
