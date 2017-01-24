app.directive('chapterPage', ['$window', function ($window) {
  return {
    restrict: 'E',
    templateUrl: 'views/readStories/chapterPageView.html',
    link: function($scope, ele, attr) {
      $scope.scroll = function () {
        $window.scrollTo(0, 0);
      };
    }
  };
}]);
