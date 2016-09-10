var app = angular.module('simsReader', [
  'ngRoute',
  'templateCache',
  'ui-notification',
]);

app.config(['$routeProvider', '$locationProvider', 'NotificationProvider', function($routeProvider, $locationProvider, NotificationProvider) {
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
      controller : ''
    })
    .when('/story', {
      templateUrl : 'js/views/storyView.html',
      controller : 'storyController'
    })
    .when('/user', {
      templateUrl : 'js/views/userView.html',
      controller : ''
    })
    .when('/verify/:accessToken', {
      templateUrl : 'js/views/regconfView.html',
      controller : 'registerController'
    })
    .otherwise({
      redirectTo: '/'
    });

    NotificationProvider.setOptions({
        delay: 10000,
        startTop: 20,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'right',
        positionY: 'bottom'
    });

  $locationProvider.html5Mode(true);
}]);

app.run(['userService', function(userService) {
  userService.getIsLoggedIn()
  .then(function(res) {
    if (res) {
      userService.getUser();
    }
  });
}]);

app.controller('mainController', ['$scope', '$http', 'userService', function($scope, $http, userService) {
  $scope.userService = userService;
}]);

app.controller('panelController', function() {
  this.tab = 1;

  this.selectTab = function(setTab) {
    this.tab = setTab;
  };

  this.isSelected = function(checkTab) {
    return this.tab === checkTab;
  };
});
