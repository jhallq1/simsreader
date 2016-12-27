app.directive('deleteChapter', ['$http', 'locationService', 'Notification', '$mdDialog', function($http, locationService, Notification, $mdDialog) {
  return {
    restrict: 'E',
    template: '<md-button aria-label="Delete Chapter" class="md-icon-button md-primary" ng-click="showConfirm($event)" ><md-icon md-svg-icon="delete"></md-icon></md-button>',
    scope: {
      chapter: '='
    },
    link: function($scope, ele, attr) {
      $scope.delete = function(chapter_id) {
        $http({
          method: 'POST',
          url: locationService.origin + '/deleteChapter',
          data: {chapter_id: chapter_id},
          withCredentials: true
        })
        .then(function(res) {
          if (res.data) {
            Notification.success(res.data.msg);
          } else {
            Notification.error(res.data.msg);
          }
        });
      };

      $scope.showConfirm = function(ev) {
        var confirm = $mdDialog.confirm()
              .title('Would you like to delete this chapter?')
              .textContent('This action cannot be undone.')
              .ariaLabel('Delete Chapter')
              .targetEvent(ev)
              .ok('Delete')
              .cancel('Never Mind!');

        $mdDialog.show(confirm).then(function() {
          $scope.delete($scope.chapter.id);
        }, function() {
          $mdDialog.cancel();
        });
      };
    }
  };
}]);
