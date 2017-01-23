app.directive('progress', ['filesService', function(filesService) {
  return {
    restrict: 'A',
    scope: {

    },
    link: function($scope, element, attrs) {
      element.bind('load', function() {
          filesService.setProgress(false);
      });
      element.bind('error', function(){
          alert('image could not be loaded');
      });
    }
  };
}]);
