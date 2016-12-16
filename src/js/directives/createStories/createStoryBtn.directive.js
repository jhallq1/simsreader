app.directive('newStoryPrompt', ['$mdDialog', 'Notification', '$http', 'locationService', function($mdDialog, Notification, $http, locationService) {
  return {
    restrict: 'A',
    scope: {
      stories: '='
    },
    link: function($scope, ele, attr) {
      ele.on('click', (ev) => {
        $scope.showNewStoryDialog(ev);
      });

      $scope.initNewStory = function() {
        $scope.story = {};
      };

      $scope.showNewStoryDialog = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'views/createStories/newStoryPromptView.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          locals: {
            localScope: $scope
          },
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });
      };

      function DialogController($scope, $mdDialog, localScope) {
        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.submitForm = localScope.submitForm;

        localScope.initNewStory();
      }

      if (!$scope.stories) $scope.initNewStory();
    }
  };
}]);
