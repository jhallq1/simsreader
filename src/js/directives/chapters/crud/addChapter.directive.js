app.directive('addChapter', ['Notification', '$http', 'locationService', 'storiesService', function(Notification, $http, locationService, storiesService) {
  return {
    restrict: 'A',
    link: function($scope, ele, attr) {
      $scope.submitForm = function(form) {
        if (!form.$valid) return;
        $http({
          method: 'POST',
          url: locationService.origin + '/createChapter',
          data: {story_id: storiesService.getStory().id, chapter_title: form.Title.$modelValue},
          withCredentials: true
        })
        .then(function(res) {
          if (res.data && res.data.items) {
            Notification.success(res.data.msg);
            storiesService.setChapter(res.data.items.chapter_id);
          } else {
            Notification.error(res.data.msg);
          }
        });
      };
    }
  };
}]);
