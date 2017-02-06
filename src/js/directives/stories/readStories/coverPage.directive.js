app.directive('coverPage', ['$http', 'locationService', '$route', 'storiesService', '$mdDialog', '$location', 'Notification',
function($http, locationService, $route, storiesService, $mdDialog, $location, Notification) {
  return {
    restrict: 'E',
    templateUrl: 'views/readStories/coverPageView.html',
    link: function($scope, ele, attr) {
      let currentRouteParams = $route.current.params;

      $scope.show = false;

      $scope.showConfirmAge = function(res) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
          .title('This story contains mature content.')
          .textContent('Are you at least 18 years of age?')
          .ariaLabel('Age Confirmation')
          .ok('Yes')
          .cancel('No');

        $mdDialog.show(confirm).then(function() {
          $mdDialog.hide();
          $scope.show = true;
          $scope.story = res;
          storiesService.setStory(res);
          Notification.primary("Thanks for confirming that you meet the age requirement.");
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
          if (res.data.items.story.age_restricted == 1) {
            $scope.showConfirmAge(res.data.items.story);
          } else {
            $scope.show = true;
          }
        }
      });
    }
  };
}]);
