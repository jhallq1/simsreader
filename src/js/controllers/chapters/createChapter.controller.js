app.controller('createChapterController', ['$scope', 'locationService', '$http', 'Notification', '$location', function($scope, locationService, $http, Notification, $location) {
  $scope.submitForm = function(form) {
    if (!form.$valid) return;

    $http({
      method: 'POST',
      url: locationService.origin + '/addChapter',
      data: {title: form.Title.$modelValue},
      withCredentials: true
    })
    .then(function(res) {
      if (res.data && res.data.items) {
        Notification.success(res.data.msg);
      } else {
        Notification.error(res.data.msg);
      }
    });
  };
}]);
