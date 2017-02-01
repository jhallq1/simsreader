app.directive('chapterPage', ['$window', '$http', 'locationService', '$route', 'storiesService', function ($window, $http, locationService, $route, storiesService) {
  return {
    restrict: 'E',
    templateUrl: 'views/readStories/chapterPageView.html',
    link: function($scope, ele, attr) {
      let currentRouteParams = $route.current.params;

      $scope.scroll = function () {
        $window.scrollTo(0, 0);
      };

      $scope.openChapter = function(index) {
        $http({
          method: 'GET',
          url: `${locationService.origin}/getChapterDetails`,
          params: {story_id: currentRouteParams.story_id, index: index + 1},
          withCredentials: true
        })
        .then(function(res) {
          if (res.data && res.data.items) {
            $scope.story_id = res.data.items.story_id;
            $scope.chapter = res.data.items.chapter;
            $scope.pages = res.data.items.pageData;
            $scope.author = storiesService.getStory().username;
            $scope.date = storiesService.getStory().created;
          }
        });
      };
    }
  };
}]);
