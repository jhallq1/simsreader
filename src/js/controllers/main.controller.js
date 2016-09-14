app.controller('mainController', ['$scope', '$http', 'userService', function($scope, $http, userService) {
  $scope.userService = userService;
}]);
