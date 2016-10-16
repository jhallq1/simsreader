app.directive('saveBtn', [function() {
  return {
    restrict: 'E',
    template: '<button class="btn btn-primary">Save</button>',
    scope: {
      files: '=',
      progress: '='
    },
    link: function($scope, ele, attr) {
      
    }
  };
}]);
