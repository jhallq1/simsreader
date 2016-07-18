var app = angular.module('simsReader', [
  'ngRoute',
  'templateCache'
]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl : 'js/views/homeView.html',
      controller : 'mainController'
    })
    .when('/home', {
      templateUrl : 'js/views/homeView.html',
      controller : 'mainController'
    })
    .when('/register', {
      templateUrl : 'js/views/registerView.html',
      controller : 'registerController'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
}]);

app.controller('mainController', function($scope) {
  $scope.message = 'WORDS ON YOUR HOME SCREEN';
});
