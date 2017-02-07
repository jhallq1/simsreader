app.controller('manageStories', ['$scope', '$http', 'locationService', '$route', 'storiesService', 'Upload', 'Notification', '$timeout', 'filesService',
function ($scope, $http, locationService, $route, storiesService, Upload, Notification, $timeout, filesService) {
  $scope.files = [];
  $scope.spinner = {};
  $scope.view = 0;

  $scope.toolbarOptions = {
    showMyStories: true,
    showAddScreenshots: false,
    showSave: false,
    showManage: false
  };

  let currentRouteParams = $route.current.params;

  if (Object.keys(currentRouteParams).length === 0) {
    $scope.view = 0;
    $http({
      method: 'get',
      url: `${locationService.origin}/getStories`,
      withCredentials: true
    })
    .then(function(res) {
      if (res.data && res.data.items) {
        $scope.stories = res.data.items;
        storiesService.setAllStories(res.data.items);
      }
    });
  } else if (currentRouteParams.story_title && !currentRouteParams.chapter_id) {
    $scope.view = 1;
    story_id = storiesService.getStory().id;
  } else if (currentRouteParams.story_title && currentRouteParams.chapter_id) {
      $scope.view = 2;
      $scope.toolbarOptions.showAddScreenshots = true;
      $scope.toolbarOptions.showSave = true;
      story_id = storiesService.getStory().id;
      chapter_id = storiesService.getChapter().id;
  }
}]);
