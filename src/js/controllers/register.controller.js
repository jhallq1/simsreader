app.controller('registerController', ['$http', 'Notification', 'locationService', '$scope', function($http, Notification, locationService, $scope) {
  let user = {};

  $scope.submitForm = function(isValid) {
    if (isValid) {
      $http({
        method: 'POST',
        url: locationService.origin + '/register',
        data: {username: $scope.user.username, email: $scope.user.emailAddress, password: $scope.user.password, passwordMatch: $scope.user.passwordMatch}
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
    return $scope.user.password && $scope.user.passwordMatch === $scope.user.password && $scope.user.password.length > 7 ? true : false;
  };
}]);
