app.directive('getChapters', [function() {
  return {
    restrict: 'E',
    template: '<md-button class="md-icon-button md-primary" aria-label="Go to Chapters" ng-click="getChapters()"><md-icon md-svg-icon="arrow-right-bold"></md-icon></md-button>',
    scope: {
      files: '=',
    },
    link: function($scope, ele, attr) {
      $scope.getChapters = function() {
        $http({
          method: 'get',
          url: locationService.origin + '/getChapters',
          withCredentials: true
        })
        .then(function(res) {
          if (res.data && res.data.items) {
            $scope.chapters = res.data.items.chapters;
          }
        });
      };
    }
  };
}]);
