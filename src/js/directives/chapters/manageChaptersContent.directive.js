app.directive('manageChaptersContent', ['$mdMedia', 'Upload', 'storiesService', '$route', '$http', 'locationService',
function($mdMedia, Upload, storiesService, $route, $http, locationService) {
  return {
    restrict: 'E',
    scope: {
      stories: '='
    },
    template: '<div ng-include="mediaQuery(\'gt-sm\') ? \'views/chapters/manageChaptersView.html\' : \'views/chapters/addChapterMobile.html\'"></div>',
    link: function($scope) {
      $scope.story = storiesService.getStory();
      $scope.story_id = storiesService.getStory().id;

      let currentRouteParams = $route.current.params;

      $http({
        method: 'GET',
        url: `${locationService.origin}/getChapters`,
        params: {
          story_id: $scope.story_id,
          story_title: currentRouteParams.story_title
        },
        withCredentials: true
      })
      .then(function(res) {
        if (res.data && res.data.items) {
          $scope.chapters = res.data.items;
        }
      });

      $scope.mediaQuery = $mdMedia;
    }
  };
}]);
