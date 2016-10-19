app.directive('newStoryPrompt', ['$mdDialog', function($mdDialog) {
  return {
    restrict: 'A',
    scope: {

    },
    link: function($scope, ele, attr) {
      ele.on('click', (ev) => {
        $scope.showNewStoryDialog(ev);
      });

      $scope.showNewStoryDialog = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'views/createStories/newStoryPromptView.html',
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
      }
    }
  };
}]);
