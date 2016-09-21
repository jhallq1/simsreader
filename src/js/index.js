var app = angular.module('simsReader', [
  'ngRoute',
  'templateCache',
  'ui-notification',
]);

app.config(['$routeProvider', '$locationProvider', 'NotificationProvider', function($routeProvider, $locationProvider, NotificationProvider) {
  $routeProvider
    .when('/', {
      templateUrl : 'views/homeView.html',
      controller : 'mainController'
    })
    .when('/home', {
      templateUrl : 'views/homeView.html',
      controller : 'mainController'
    })
    .when('/register', {
      templateUrl : 'views/registerView.html',
      controller : ''
    })
    .when('/story', {
      templateUrl : 'views/storyView.html',
      controller : 'storyController'
    })
    .when('/user', {
      templateUrl : 'views/userView.html',
      controller : ''
    })
    .when('/verify/:verification_token', {
      templateUrl : 'views/regconfView.html',
      controller : 'registerController'
    })
    .when('/forgotPassword', {
      templateUrl : 'views/forgotPasswordView.html',
      controller : 'forgotPasswordController',
      isLoggedOut: true
    })
    .when('/resetPassword/:passwordToken', {
      templateUrl : 'views/resetPasswordView.html',
      controller : 'resetPasswordController',
      isLoggedOut: true
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

app.run(['userService', '$rootScope', '$location', function(userService, $rootScope, $location) {
  userService.getIsLoggedIn()
  .then(function(res) {
    if (res) {
      userService.getUser();
    }

    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      if(next.isLoggedOut && userService.isloggedin()) {
          event.preventDefault();
      }

      // if we want them to be logged in AND they are logged out, prevent controller load
      if(next.isLoggedIn && !userService.isloggedin()) {
          event.preventDefault();
      }
    });
  });
}]);
