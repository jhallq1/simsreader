app.controller('registerController', ['$http', 'Notification', 'locationService', '$scope', function($http, Notification, locationService, $scope) {

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
    return $scope.password && $scope.passwordMatch === $scope.password && $scope.password.length > 7 ? true : false;
  };
}]);
