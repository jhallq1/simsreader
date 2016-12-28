app.directive('editChapter', ['$http', 'locationService', 'Notification', function($http, locationService, Notification) {
  return {
    restrict: 'A',
    link: function($scope, ele, attr) {
      $scope.submitForm = function(form) {
        if (!form.$valid) return;
        $http({
          method: 'POST',
          url: locationService.origin + '/editChapter',
          data: {chapter_id: $scope.chapter.id, chapter_title: form.Title.$modelValue},
          withCredentials: true
        })
        .then(function(res) {
          if (res.data) {
            Notification.success(res.data.msg);
          } else {
            Notification.error(res.data.msg);
          }
        });
      };
    }
  };
}]);
