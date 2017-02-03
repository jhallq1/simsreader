app.directive('report', ['$http', 'locationService', '$route', 'storiesService', '$mdDialog', '$location', 'Notification', function($http, locationService, $route, storiesService, $mdDialog, $location, Notification) {
  return {
    restrict: 'E',
    template: '<md-button class="md-icon-button" aria-label="Report" ng-click="showAdvanced(ev)"><md-icon md-svg-icon="alert" style="color: red;"><md-tooltip>Report Me</md-tooltip></md-icon></md-button>',
    link: function($scope, ele, attr) {
      function DialogController($scope, $mdDialog) {
        let story_id = storiesService.getStory().id || "Not Provided";
        let chapter_id = storiesService.getChapter().id || "Not Provided";
        let comment_id = "Not Provided";

        $scope.selected = [];

        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };

        $scope.toggle = function(input) {
          if (!$scope.selected.includes(input)) {
            $scope.selected.push(input);
          } else {
            $scope.selected.splice($scope.selected.indexOf(input), 1);
          }
        };

        $scope.submitForm = function(form) {
          if (!form.explanation && !$scope.selected.length) Notification.error("Invalid form. Please select at least one option.");
          if (!form.explanation && $scope.selected.includes(5)) Notification.error("You selected Other. Please explain in the textarea provided.");

          $http({
            method: 'POST',
            url: locationService.origin + '/sendReport',
            data: {flags: $scope.selected, explanation: form.explanation || "Not Provided", story_id: story_id, chapter_id: chapter_id, comment_id: comment_id},
            withCredentials: true
          })
          .then(function(res) {
            if (res.data && res.data.msg) {
              $scope.cancel();
              Notification.success(res.data.msg);
            } else {
              Notification.error("Oops! Something went wrong there.");
            }
          });
        };
      }

      $scope.showAdvanced = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'views/readStories/reportForm.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
          $scope.submitForm(form);
        }, function() {
          $mdDialog.hide();
        });
      };
    }
  };
}]);
