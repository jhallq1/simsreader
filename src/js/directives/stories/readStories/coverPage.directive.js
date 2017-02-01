app.directive('coverPage', ['$http', 'locationService', '$route', function($http, locationService, $route) {
  return {
    restrict: 'E',
    templateUrl: 'views/readStories/coverPageView.html',
    scope: {

    },
    link: function($scope, ele, attr) {
      let currentRouteParams = $route.current.params;

      $http({
        method: 'GET',
        url: `${locationService.origin}/getCoverPage`,
        params: {story_id: currentRouteParams.story_id},
        withCredentials: true
      })
      .then(function(res) {
        if (res.data && res.data.items) {
          $scope.story = res.data.items.story;
        }
      });
    }
  };
}]);
