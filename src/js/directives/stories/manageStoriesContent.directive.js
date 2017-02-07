app.directive('manageStoriesContent', ['$mdMedia', function($mdMedia) {
  return {
    restrict: 'E',
    scope: {
      stories: '=',
      toolbarOptions: '='
    },
    template: '<div ng-include="mediaQuery(\'gt-sm\') ? \'views/createStories/storyListDesktopView.html\' : \'views/createStories/storyListMobileView.html\'"></div>',
    link: function($scope) {
      $scope.mediaQuery = $mdMedia;
    }
  };
}]);
