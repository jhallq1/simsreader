app.directive('editStory', ['$http', 'locationService', 'Notification', function($http, locationService, Notification) {
  return {
    restrict: 'A',
    link: function($scope, ele, attr) {
      $scope.submitForm = function(form) {

        if (!form.$valid) return;
        $http({
          method: 'POST',
          url: locationService.origin + '/editStory',
          data: {id: $scope.story.id, title: form.Title.$modelValue, description: form.Description.$modelValue, age_restricted: form.Age_Restricted.$modelValue || false},
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
