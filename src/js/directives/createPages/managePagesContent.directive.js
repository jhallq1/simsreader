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
      $scope.files = $scope.files || [];

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
    }
  };
}]);
