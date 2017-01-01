app.directive('emptyStory', [function() {
  return {
    restrict: 'E',
    templateUrl: 'views/chapters/newChapterFormView.html',
    scope: {
      // files: '=',
    },
    link: function($scope, ele, attr) {

    }
  };
}]);
