app.directive('getPages', ['$location', 'storiesService', function($location, storiesService) {
  return {
    restrict: 'E',
    template: '<md-button class="md-icon-button md-primary" aria-label="Go to Pages" ng-click="goToPages()"><md-icon md-svg-icon="arrow-right-bold"></md-icon></md-button>',
    scope: {
      story: '=',
      chapter: '=',
      index: '='
    },
    link: function($scope, ele, attr) {
      let index;

      try {
        index = parseInt($scope.index) + 1;
      } catch (e) {
        //
      }

      $scope.goToPages = function() {
        $location.url($location.path() + '/' + index);
        storiesService.getStory($scope.story);
        storiesService.setChapter($scope.chapter);
      };
    }
  };
}]);
