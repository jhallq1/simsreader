app.directive('emptyChapter', [function() {
  return {
    restrict: 'E',
    template: '<p style=\"text-align: center;\">Your chapter needs pages! Use the <b>ADD SCREENSHOTS</b> button to create some now.</p>',
    scope: {
      files: '=',
    },
    link: function($scope, ele, attr) {

    }
  };
}]);
