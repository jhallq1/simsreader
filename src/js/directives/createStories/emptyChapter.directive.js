app.directive('emptyChapter', [function() {
  return {
    restrict: 'E',
    templateUrl: 'views/createStories/emptyChapterView.html',
    scope: {
      files: '=',
    },
    link: function($scope, ele, attr) {

    }
  };
}]);
