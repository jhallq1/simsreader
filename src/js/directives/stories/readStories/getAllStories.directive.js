app.directive('getAllStories', ['$http', 'locationService', function($http, locationService) {
  return {
    restrict: 'E',
    scope: {
    },
    templateUrl: 'views/readStories/allStoriesList.html',
    link: function($scope) {
      $http({
        method: 'GET',
        url: `${locationService.origin}/getAllStories`,
        params: {},
        withCredentials: true
      })
      .then(function(res) {
        if (res.data && res.data.items) {
          $scope.allStories = res.data.items;
        }
      });
    }
  };
}]);
