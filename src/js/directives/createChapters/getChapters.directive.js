app.directive('getChapters', ['$http', 'locationService', 'storiesService', '$location', function($http, locationService, storiesService, $location) {
  return {
    restrict: 'E',
    template: '<md-button class="md-icon-button md-primary" aria-label="Go to Chapters" ng-click="goToChapters()"><md-icon md-svg-icon="arrow-right-bold"></md-icon></md-button>',
    scope: {
      story: '=',
    },
    link: function($scope, ele, attr) {
      $scope.goToChapters = function() {
        $location.url('/manageChapters');
        storiesService.setStory($scope.story);
      };

      // $scope.getChapters = function() {
      //   $http({
      //     method: 'GET',
      //     url: locationService.origin + '/getChapters',
      //     params: {story_id: $scope.storyid},
      //     withCredentials: true
      //   })
      //   .then(function(res) {
      //     if (res.data && res.data.items) {
      //       $scope.chapters = res.data.items;
      //     }
      //   });
      // };
    }
  };
}]);
