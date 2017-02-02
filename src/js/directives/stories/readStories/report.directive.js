app.directive('report', ['$http', 'locationService', '$route', 'storiesService', '$mdDialog', '$location', 'Notification', function($http, locationService, $route, storiesService, $mdDialog, $location, Notification) {
  return {
    restrict: 'E',
    template: '<md-button class="md-icon-button" aria-label="Report" ng-click="showAdvanced(ev)"><md-icon md-svg-icon="alert" style="color: red;"><md-tooltip>Report Me</md-tooltip></md-icon></md-button>',
    link: function($scope, ele, attr) {
      function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
      }

      $scope.showAdvanced = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'views/readStories/reportForm.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
      };
    }
  };
}]);
