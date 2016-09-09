app.controller('registerController', ['$scope', '$routeParams', '$http', 'locationService', 'Notification', '$window', function($scope, $routeParams, $http, locationService, Notification, $window) {
  $scope.isverified = false;

  $http.get(locationService.origin + "/verify/" +  $routeParams.accessToken)
  .then(
    function success(res) {
      $scope.isverified = true;
      Notification.success(res.data.msg);
    },
    function error(error) {
      $window.location.href = '/index.html';
    }
  );
}]);
