app.directive('addPage', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/createStories/pageView.html',
    scope: {
      index: '=',
      file: '=',
      removeFile: '&',
      caption: '@',
      chapterTitle: '@'
    },
    link: function($scope) {
      $scope.text = function(caption) {
      };
    }
  };
});
