app.controller('createStoryController', ['$scope', function ($scope) {
  $scope.files = [];

  $scope.submitForm = function(isValid) {
    if (isValid) {
      $http({
        method: 'POST',
        url: locationService.origin + '/createStory',
        data: {title: $scope.story.title, description: $scope.story.description}
      })
      .then(function(res) {
        if (res.data && res.data.items && res.data.items.status) {
          Notification.success(res.data.msg);
          $scope.showSuccessMsg = true;
        } else {
          Notification.error(res.data.msg);
        }
      });
    } else {
      Notification.error("Invalid form data");
    }
  };
}]);
