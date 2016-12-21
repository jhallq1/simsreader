app.controller('manageStories', ['$scope', '$http', 'locationService', '$location', 'storiesService', function ($scope, $http, locationService, $location, storiesService) {
  $scope.files = [];

  $scope.currentRoute = $location.url();

  if ($scope.currentRoute === '/manageStories') {
    $http({
      method: 'get',
      url: locationService.origin + '/getStories',
      withCredentials: true
    })
    .then(function(res) {
      if (res.data && res.data.items) {
        $scope.stories = res.data.items;
      }
    });
  } else if ($scope.currentRoute === '/manageChapters') {
    console.log('get chapters');
    story_id = storiesService.getStory();
  }
}]);
