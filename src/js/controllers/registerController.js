app.controller('registerController', ['$http', '$scope', function($http, $scope) {
  $scope.submitForm = function(isValid) {
    if (isValid) {
      $http({
        method: 'POST',
        url: 'http://localhost:2112/register',
        data: {username: $scope.username, emailAddress: $scope.emailAddress, password: $scope.password1}
      })
      .then(function(res) {
        console.log(res);
      });
    }
  };

  $scope.isMatch = function() {
    if ($scope.password2 == $scope.password1) {
      return true;
    } else {
      return false;
    }
  };

  $scope.registerUser = function(user) {
    $timeout(function() {
      GetByEmail(user.email)
        .then(function(duplicateUser) {
          if (duplicateUser !== null) {
            deferred.resolve({ success: false, message: 'An account has already been registered with this email address' });
          } else {
            deferred.resolve({ success: true });
          }
        });
    });
  };
}]);
