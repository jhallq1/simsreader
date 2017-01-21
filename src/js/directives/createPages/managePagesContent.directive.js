app.directive('managePagesContent', ['$mdMedia', 'Upload', 'storiesService', '$http', '$route', 'locationService', function($mdMedia, Upload, storiesService, $http, $route, locationService) {
  return {
    restrict: 'E',
    scope: {
      files: '=',
      stories: '=',
      chapters: '='
    },
    template: '<div ng-include="mediaQuery(\'gt-sm\') ? \'views/pages/editPages-Desktop.html\' : \'views/pages/editPages-Mobile.html\'"></div>',
    link: function($scope) {
      $scope.files = $scope.files || [];
      $scope.story_id = storiesService.getStory().id;
      $scope.chapter_id = storiesService.getChapter().id;

      let currentRouteParams = $route.current.params;

      $http({
        method: 'GET',
        url: locationService.origin + '/getPages',
        params: {story_id: $scope.story_id, story_title: currentRouteParams.story_title, chapter_id: $scope.chapter_id, chapter_index: currentRouteParams.chapter_id},
        withCredentials: true
      })
      .then(function(res) {
        if (res.data && res.data.items) {
          $scope.files = res.data.items.items;
        }
      });

      $scope.mediaQuery = $mdMedia;
    }
  };
}]);
