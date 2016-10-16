app.directive('uploadFilesBtn', ['Upload', function(Upload) {
  return {
    restrict: 'E',
    template: '<md-button ngf-keep="true" ngf-select="uploadFiles($files)" multiple accept="image/*">Select Files</md-button>',
    scope: {
      files: '=',
      progress: '='
    },
    link: function($scope, ele, attr) {
      $scope.uploadFiles = function (files) {
        $scope.files = files;
        if (files && files.length) {
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
          //     $scope.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          // });
        }
      };
    }
  };
}]);
