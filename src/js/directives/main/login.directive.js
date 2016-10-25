app.directive('login', ['$http', 'Notification', 'locationService', 'userService', '$mdDialog', function($http, Notification, locationService, userService, $mdDialog) {
  return {
    restrict: 'A',
    scope: {

    },
    link: function($scope, ele, attr) {
      ele.on('click', (ev) => {
        $scope.showLogin(ev);
      });

      $scope.showLogin = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'views/navBarUserLoginView.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          locals: {
            items: $scope
          },
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });
      };

      function DialogController($scope, $mdDialog) {
        $scope.user = {};

        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.submitForm = function(form) {
          if (!form) return;
          $http({
            method: 'POST',
            url: locationService.origin + '/login',
            data: $scope.user,
            withCredentials: true
          })
          .then(function(res) {
            if (res.data && res.data.items && res.data.items.login) {
              Notification.success(res.data.msg);
              userService.setIsLoggedIn(true);
              userService.setUser(res.data.items);
              $scope.cancel();
            } else {
              Notification.error(res.data.msg);
              userService.setIsLoggedIn(false);
            }
          });
        };
      }
    }
  };
}]);
