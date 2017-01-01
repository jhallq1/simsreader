app.directive('managePagesContent', ['$mdMedia', 'Upload', 'storiesService', '$http', 'locationService', function($mdMedia, Upload, storiesService, $http, locationService) {
  return {
    restrict: 'E',
    scope: {
      files: '=',
      stories: '=',
      chapters: '='
    },
    template: '<div ng-include="mediaQuery(\'gt-sm\') ? \'views/pages/editPages-Desktop.html\' : \'views/pages/editPages-Mobile.html\'"></div>',
    link: function($scope) {
      $scope.chapter_id = storiesService.getChapter().id;
      $http({
        method: 'GET',
        url: locationService.origin + '/getPages',
        params: {chapter_id: $scope.chapter_id},
        withCredentials: true
      })
      .then(function(res) {
        if (res.data && res.data.items) {
          $scope.pages = res.data.items;
        }
      });

      $scope.mediaQuery = $mdMedia;

      $scope.uploadFiles = function (files) {
        $scope.files = files;

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

      $scope.removeFile = function(index) {
        $scope.files.splice(index, 1);
      };
    }
  };
}]);
