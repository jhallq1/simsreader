app.directive('getChapters', ['$http', 'locationService', function($http, locationService) {
  return {
    restrict: 'E',
    template: '<md-button class="md-icon-button md-primary" aria-label="Go to Chapters" ng-click="getChapters()"><md-icon md-svg-icon="arrow-right-bold"></md-icon></md-button>',
    scope: {
      story: '=',
    },
    link: function($scope, ele, attr) {
      $scope.getChapters = function() {
        $http({
          method: 'GET',
          url: locationService.origin + '/getChapters',
          params: {story_id: $scope.story.id},
          withCredentials: true
        })
        .then(function(res) {
          if (res.data && res.data.items) {
            $scope.chapters = res.data.items;
          }
        });
      };
    }
  };
}]);
