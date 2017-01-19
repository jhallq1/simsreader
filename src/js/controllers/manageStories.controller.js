app.controller('manageStories', ['$scope', '$http', 'locationService', '$location', 'storiesService', 'Upload', 'Notification', '$timeout', function ($scope, $http, locationService, $location, storiesService, Upload, Notification, $timeout) {
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
    story_id = storiesService.getStory().id;
  } else if ($scope.currentRoute === '/managePages') {
    story_id = storiesService.getStory().id;
    chapter_id = storiesService.getChapter().id;
  }

  $scope.uploadFiles = function(files) {
    $scope.files = files;
    if (files && files.length) {
      // Upload.upload({
      //     url: locationService.origin + '/addPages',
      //     data: {
      //         files: files
      //     },
      //     withCredentials: true
      // }).then(function (response) {
      //     $timeout(function () {
      //         $scope.result = response.data;
      //     });
      // }, function (response) {
      //     if (response.status > 0) {
      //         $scope.errorMsg = response.status + ': ' + response.data;
      //     }
      // }, function (evt) {
      //     $scope.progress =
      //         Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      // });
    }
  };

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
