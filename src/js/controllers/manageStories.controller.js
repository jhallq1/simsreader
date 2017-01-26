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

  $scope.addPages = function(files) {
    let captions = [];
    let text = {};
    let values;

    if ($scope.files.length) {
      for (let i = 0; i < $scope.files.length; i++) {
        captions.push(text);
        captions[i].text = $scope.files[i].caption;
        text = {};
        // captions.push([$scope.files[i].caption]);
      }

      Upload.upload({
          url: locationService.origin + '/addPages',
          data: {captions: captions, story_id: story_id, chapter_id: chapter_id, files: $scope.files},
          method: 'POST',
          withCredentials: true
      })
      .then(function(res) {
        if (res.data && res.data.items.msg) {
          $scope.$applyAsync(function() {
            values = res.data.items.items;
            for (let ii = 0; ii < values.length; ii++) {
              $scope.files[ii].chapter_id = values[ii].chapter_id;
              $scope.files[ii].path = values[ii].path;
            }
          });

          Notification.success(res.data.items.msg);
        } else {
          Notification.error(res.data.msg);
        }
      });
    }
  };

  $scope.removeFile = function(index) {
    $scope.files.splice(index, 1);
  };
}]);
