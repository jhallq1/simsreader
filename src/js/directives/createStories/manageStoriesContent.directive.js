app.directive('manageStoriesContent', ['$mdMedia', 'Upload', function($mdMedia, Upload) {
  return {
    restrict: 'E',
    scope: {
      stories: '='
    },
    template: '<div ng-include="mediaQuery(\'gt-sm\') ? \'views/createStories/chapterDesktopView.html\' : \'views/createStories/chapterMobileView.html\'"></div>',
    link: function($scope) {
      $scope.mediaQuery = $mdMedia;
    }
  };
}]);
