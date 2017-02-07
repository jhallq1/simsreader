app.directive('storyMgmtToolbar', ['$mdMedia', 'Upload', 'filesService', 'storiesService', '$location', '$route', function($mdMedia, Upload, filesService, storiesService, $location, $route) {
  return {
    restrict: 'E',
    scope: {
      toolbarOptions: '=',
      addPages: '=',
      stories: '='
    },
    template: '<div ng-include="mediaQuery(\'gt-sm\') ? \'views/stories/storyMgmtToolbarDesktop.html\' : \'views/stories/storyMgmtToolbarMobile.html\'"></div>',
    link: function($scope, element, attrs) {
      $scope.allStories = storiesService.getAllStories();
      $scope.mediaQuery = $mdMedia;

      $scope.beforeChange = function(files) {
        filesService.setProgress(true);
      };

      $scope.selectFiles = function(files) {
        filesService.addFiles(files);
        $scope.files = filesService.getFiles();
      };

      $scope.getChapters = function(story) {
        $location.url($location.path() + '/' + story.title);
        storiesService.setStory(story);
      };
    }
  };
}]);
