app.directive('deleteStory', ['$http', 'locationService', 'Notification', '$mdDialog', function($http, locationService, Notification, $mdDialog) {
  return {
    restrict: 'E',
    template: '<md-button aria-label="Delete Story" class="md-icon-button md-primary" ng-click="showConfirm($event)" ><md-icon md-svg-icon="delete"></md-icon></md-button>',
    scope: {
      story: '='
    },
    link: function($scope, ele, attr) {
      $scope.delete = function(story_id) {
        $http({
          method: 'POST',
          url: locationService.origin + '/deleteStory',
          data: {story_id: story_id},
          withCredentials: true
        })
        .then(function(res) {
          if (res.data && res.data.items) {
            Notification.success(res.data.msg);
          } else {
            Notification.error(res.data.msg);
          }
        });
      };

      $scope.showConfirm = function(ev) {
        var confirm = $mdDialog.confirm()
              .title('Would you like to delete this story?')
              .textContent('This action cannot be undone.')
              .ariaLabel('Delete Story')
              .targetEvent(ev)
              .ok('Delete')
              .cancel('Never Mind!');

        $mdDialog.show(confirm).then(function() {
          $scope.delete($scope.story.id);
        }, function() {
          $mdDialog.cancel();
        });
      };
    }
  };
}]);
