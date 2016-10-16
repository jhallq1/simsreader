app.directive('nowEditing', [function() {
  return {
    restrict: 'E',
    templateUrl: 'views/createStories/nowEditingView.html',
    scope: {
      files: '=',
    },
    link: function($scope, ele, attr) {

    }
  };
}]);
