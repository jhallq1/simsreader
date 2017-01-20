app.directive('getPages', ['$location', 'storiesService', function($location, storiesService) {
  return {
    restrict: 'E',
    template: '<md-button class="md-icon-button md-primary" aria-label="Go to Pages" ng-click="goToPages()"><md-icon md-svg-icon="arrow-right-bold"></md-icon></md-button>',
    scope: {
      story: '=',
      chapter: '='
    },
    link: function($scope, ele, attr) {
      $scope.goToPages = function() {
        $location.url('/managePages');
        storiesService.getStory($scope.story);
        storiesService.setChapter($scope.chapter);
      };
    }
  };
}]);
