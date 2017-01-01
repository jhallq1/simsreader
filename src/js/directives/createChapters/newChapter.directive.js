app.directive('newChapter', [function() {
  return {
    restrict: 'E',
    templateUrl: 'views/createStories/newChapterFormView.html',
    scope: {
      // files: '=',
    },
    link: function($scope, ele, attr) {
      $scope.submitForm = function(form) {
        if (!form) return;

        $http({
          method: 'POST',
          url: locationService.origin + '/createStory',
          data: $scope.story,
          withCredentials: true
        })
        .then(function(res) {
          if (res.data && res.data.items) {
            Notification.success(res.data.msg);
            $scope.cancel();
          } else {
            Notification.error(res.data.msg);
          }
        });
      };
    }
  };
}]);
