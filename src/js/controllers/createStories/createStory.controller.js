app.controller('createStoryController', ['$scope', '$http', 'locationService', function ($scope, $http, locationService) {
  $scope.files = [];

  $http({
    method: 'get',
    url: locationService.origin + '/getStories',
    withCredentials: true
  })
  .then(function(res) {
    console.log(res.data.items);
    if (res.data && res.data.items) {
      $scope.stories = res.data.items;
    }
  });
}]);
