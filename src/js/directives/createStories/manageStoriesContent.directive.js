app.directive('manageStoriesContent', ['$mdMedia', 'Upload', function($mdMedia, Upload) {
  return {
    restrict: 'E',
    scope: {
      files: '=',
      stories: '='
    },
    template: '<div ng-include="mediaQuery(\'gt-sm\') ? \'views/createStories/chapterDesktopView.html\' : \'views/createStories/chapterMobileView.html\'"></div>',
    link: function($scope) {
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
