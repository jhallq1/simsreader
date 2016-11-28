app.directive('newStoryPrompt', ['$mdDialog', 'Notification', '$http', 'locationService', 'storiesService', function($mdDialog, Notification, $http, locationService, storiesService) {
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
        $scope.story = {};

        $scope.stories = [];

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
            url: locationService.origin + '/createStory',
            data: $scope.story,
            withCredentials: true
          })
          .then(function(res) {
            if (res.data && res.data.items) {
              Notification.success(res.data.msg);
              storiesService.setStories(res.data.items);
              $scope.cancel();
            } else {
              Notification.error(res.data.msg);
            }
          });
        };
      }
    }
  };
}]);
