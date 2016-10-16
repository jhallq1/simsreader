app.controller('mainController', ['$scope', '$http', 'userService', '$mdMedia', function($scope, $http, userService, $mdMedia) {
  $scope.userService = userService;
  $scope.mediaQuery = $mdMedia;
}]);
