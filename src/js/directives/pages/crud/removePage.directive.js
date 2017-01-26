app.directive('removePage', ['$mdDialog', 'filesService', function($mdDialog, filesService) {
  return {
    restrict: 'E',
    template: '<a class="pointer" ng-click="showConfirm($event)"><md-icon md-svg-icon="delete" style="color: red"></md-icon></a>',
    scope: {
      files: '=',
      index: '='
    },
    link: function($scope, ele, attr) {
      $scope.remove = function(index) {
        filesService.setDeleted($scope.files[index].id);
        $scope.files.splice(index, 1);
      };

      $scope.showConfirm = function(ev) {
        var confirm = $mdDialog.confirm()
              .title('Are you sure you want to remove this page?')
              .ariaLabel('Remove Page')
              .targetEvent(ev)
              .ok('Do it!')
              .cancel('Never mind!');

        $mdDialog.show(confirm).then(function() {
          $scope.remove($scope.index);
        }, function() {
          $mdDialog.cancel();
        });
      };
    }
  };
}]);
