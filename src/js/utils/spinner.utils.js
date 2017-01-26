app.directive('spinner', ['$rootScope', function($rootScope) {
  return {
    restrict: 'A',
    template: '<div ng-show="spinner.show" layout="row" layout-sm="column" layout-align="space-around"><md-progress-circular md-mode="indeterminate"></md-progress-circular></div>',
    link: function($scope, ele, attr) {
      $scope.spinner = $rootScope.spinner;
    }
  };
}]);
