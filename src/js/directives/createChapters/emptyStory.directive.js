app.directive('emptyStory', [function() {
  return {
    restrict: 'E',
    template: '<p style=\"text-align: center;\">What good is a story without any chapters? Let\'s create one now:</p>',
    scope: {
      files: '=',
    },
    link: function($scope, ele, attr) {

    }
  };
}]);
