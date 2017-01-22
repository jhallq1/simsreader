app.directive('storyMgmtToolbar', ['$mdMedia', function($mdMedia) {
  return {
    restrict: 'E',
    scope: {
      toolbarOptions: '='
    },
    template: '<div ng-include="mediaQuery(\'gt-sm\') ? \'views/stories/storyMgmtToolbarDesktop.html\' : \'views/stories/storyMgmtToolbarMobile.html\'"></div>',
    link: function($scope) {
      $scope.mediaQuery = $mdMedia;
    }
  };
}]);
