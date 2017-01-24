app.directive('getChapters', ['$http', 'locationService', 'storiesService', '$location', function($http, locationService, storiesService, $location) {
  return {
    restrict: 'E',
    template: '<md-button class="md-icon-button md-primary" aria-label="Go to Chapters" ng-click="goToChapters()"><md-icon md-svg-icon="arrow-right-bold"></md-icon></md-button>',
    scope: {
      story: '=',
    },
    link: function($scope, ele, attr) {
      $scope.goToChapters = function() {
        $location.url($location.path() + '/' + $scope.story.title);
        storiesService.setStory($scope.story);
      };
    }
  };
}]);
