app.directive('coverPage', ['$http', 'locationService', '$route', 'storiesService', '$mdDialog', '$location', 'Notification', function($http, locationService, $route, storiesService, $mdDialog, $location, Notification) {
  return {
    restrict: 'E',
    templateUrl: 'views/readStories/coverPageView.html',
    link: function($scope, ele, attr) {
      let currentRouteParams = $route.current.params;

      $scope.showConfirmAge = function() {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
              .title('This story contains mature content.')
              .textContent('Are you at least 18 years of age?')
              .ariaLabel('Age Confirmation')
              .ok('Yes')
              .cancel('No');

        $mdDialog.show(confirm).then(function() {
          $mdDialog.hide();
          Notification.success("Thanks for confirming that you meet the age requirement.");
        }, function() {
          $location.path("/");
          Notification.success("Redirected to homepage.");
        });
      };

      $http({
        method: 'GET',
        url: `${locationService.origin}/getCoverPage`,
        params: {story_id: currentRouteParams.story_id},
        withCredentials: true
      })
      .then(function(res) {
        if (res.data && res.data.items) {
          $scope.story = res.data.items.story;
          storiesService.setStory(res.data.items.story);

          if ($scope.story.age_restricted) {
            $scope.showConfirmAge();
          }
        }
      });
    }
  };
}]);
