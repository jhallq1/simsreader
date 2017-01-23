app.directive('storyMgmtToolbar', ['$mdMedia', 'Upload', 'filesService', function($mdMedia, Upload, filesService) {
  return {
    restrict: 'E',
    scope: {
      toolbarOptions: '='
    },
    template: '<div ng-include="mediaQuery(\'gt-sm\') ? \'views/stories/storyMgmtToolbarDesktop.html\' : \'views/stories/storyMgmtToolbarMobile.html\'"></div>',
    link: function($scope, element, attrs) {
      $scope.mediaQuery = $mdMedia;

      $scope.beforeChange = function(files) {
        filesService.setProgress(true);
      };

      $scope.selectFiles = function(files) {
        filesService.addFiles(files);
      };
    }
  };
}]);
