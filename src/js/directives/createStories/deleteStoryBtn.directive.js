app.directive('deleteStory', ['$http', 'locationService', 'Notification', function($http, locationService, Notification) {
  return {
    restrict: 'E',
    template: '<md-button aria-label="Delete Story" class="md-icon-button md-primary" ng-click="delete(story.id)"><md-icon md-svg-icon="delete"></md-icon></md-button>',
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
    }
  };
}]);
