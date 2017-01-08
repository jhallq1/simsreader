app.controller('manageStories', ['$scope', '$http', 'locationService', '$location', 'storiesService', 'Upload', 'Notification', function ($scope, $http, locationService, $location, storiesService, Upload, Notification) {
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
    console.log(files);
    if (files && files.length) {
      // console.log(files);
      // Upload.upload({
      //     url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
      //     data: {
      //         files: files
      //     }
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
    if ($scope.files.length) {
      $http({
        method: 'POST',
        url: locationService.origin + '/addPages',
        data: {files: $scope.files, story_id: story_id, chapter_id: chapter_id},
        withCredentials: true
      })
      .then(function(res) {
        console.log(res.data.items);
        if (res.data && res.data.items.msg) {
          let keys = res.data.items.keys;
          console.log(keys);
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
