app.directive('showUserContentAgreement', ['$mdDialog', function($mdDialog) {
  return {
    restrict: 'A',
    scope: {

    },
    link: function($scope, ele, attr) {
      ele.on('click', (ev) => {
        $scope.showUCADialog(ev);
      });

      $scope.showUCADialog = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'views/createStories/userContentAgreementDialogView.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          locals: {
            items: $scope
          },
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        });
      };

      function DialogController($scope, $mdDialog) {
        $scope.user = {};

        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };
      }
    }
  };
}]);
