app.directive('managePagesContent', ['$mdMedia', 'Upload', 'storiesService', '$http', '$route', 'locationService', 'filesService', function($mdMedia, Upload, storiesService, $http, $route, locationService, filesService) {
  return {
    restrict: 'E',
    scope: {
      stories: '=',
      chapters: '='
    },
    template: '<div ng-include="mediaQuery(\'gt-sm\') ? \'views/pages/editPages-Desktop.html\' : \'views/pages/editPages-Mobile.html\'"></div>',
    link: function($scope) {
      $scope.progress = filesService.getProgress().show;

      $scope.$watch('filesService.getProgress().show', function(newVal, oldVal) {
        if (newVal && newVal != oldVal) {
          setTimeout(function () {
            $scope.$apply(function(){
                $scope.progress = filesService.getProgress().show;
            });
          }, 0);
        }

        if (!newVal) {
          $scope.progress = false;
        }
      });

      $scope.story_id = storiesService.getStory().id;
      $scope.chapter_id = storiesService.getChapter().id;
      $scope.filesService = filesService;

      let currentRouteParams = $route.current.params;

      $http({
        method: 'GET',
        url: locationService.origin + '/getPages',
        params: {story_id: $scope.story_id, story_title: currentRouteParams.story_title, chapter_id: $scope.chapter_id, chapter_index: currentRouteParams.chapter_id},
        withCredentials: true
      })
      .then(function(res) {
        if (res.data && res.data.items) {
          filesService.setFiles(res.data.items.items);
          $scope.files = filesService.getFiles();
        }
      });

      $scope.$watch('filesService.getFiles()', function(newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
          $scope.files = newVal;
        }
      });

      $scope.mediaQuery = $mdMedia;
    }
  };
}]);
