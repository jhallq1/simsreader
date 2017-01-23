app.controller('mainController', ['$scope', 'userService', '$mdMedia', function($scope, userService, $mdMedia) {
  $scope.userService = userService;
  $scope.mediaQuery = $mdMedia;
}]);
