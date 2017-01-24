app.directive('commentForm', ['userService', function(userService) {
  return {
    restrict: 'E',
    templateUrl: 'views/readStories/commentFormView.html',
    scope: {},
    link: function($scope, ele, attr) {
      $scope.$watch(userService.isloggedin, (newVal, oldVal) => {
        if (newVal) {
          $scope.user = userService.getUser();
        }
      });

      $scope.date = new Date();

      $scope.getRating = function(rating) {
        return new Array(rating);
      };
    }
  };
}]);
