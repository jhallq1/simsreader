app.directive('getAllStories', ['$http', 'locationService', '$mdDialog', 'Notification', '$location', function($http, locationService, $mdDialog, Notification, $location) {
  return {
    restrict: 'E',
    scope: {
    },
    templateUrl: 'views/readStories/allStoriesList.html',
    link: function($scope) {
      $scope.showConfirmAge = function(item) {
        let id = item.id;
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
              .title('This story contains mature content.')
              .textContent('Are you at least 18 years of age?')
              .ariaLabel('Age Confirmation')
              .ok('Yes')
              .cancel('No');

        $mdDialog.show(confirm).then(function() {
          $mdDialog.hide();
          $location.path("/read/" + id);
          Notification.success("Thanks for confirming that you meet the age requirement.");
        }, function() {
          Notification.success("Don't worry--plenty of other stories to read!");
        });
      };

      $http({
        method: 'GET',
        url: `${locationService.origin}/getAllStories`,
        params: {},
        withCredentials: true
      })
      .then(function(res) {
        if (res.data && res.data.items) {
          $scope.allStories = res.data.items;
        }
      });

      $scope.openStory = function(item) {
        if (item.age_restricted == 1) {
          $scope.showConfirmAge(item);
        }
      };
    }
  };
}]);
