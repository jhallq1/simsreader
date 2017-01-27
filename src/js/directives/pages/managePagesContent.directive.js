app.directive('managePagesContent', ['$mdMedia', 'Upload', 'storiesService', '$http', '$route', 'locationService', 'filesService', 'Notification', function($mdMedia, Upload, storiesService, $http, $route, locationService, filesService, Notification) {
  return {
    restrict: 'E',
    scope: {
      stories: '=',
      chapters: '=',
      toolbarOptions: '='
    },
    template: '<div ng-include="mediaQuery(\'gt-sm\') ? \'views/pages/editPages-Desktop.html\' : \'views/pages/editPages-Mobile.html\'"></div>',
    link: function($scope) {
      $scope.progress = filesService.getProgress().show;

      $scope.$watch('filesService.getProgress().show', function(newVal, oldVal) {
        if (newVal && newVal != oldVal) {
          setTimeout(function () {
            $scope.$apply(function(){
                $scope.progress = filesService.getProgress().show;
            });
          }, 0);
        }

        if (!newVal) {
          $scope.progress = false;
        }
      });

      $scope.story_id = storiesService.getStory().id;
      $scope.chapter_id = storiesService.getChapter().id;
      $scope.filesService = filesService;

      let currentRouteParams = $route.current.params;

      $http({
        method: 'GET',
        url: locationService.origin + '/getPages',
        params: {story_id: $scope.story_id, story_title: currentRouteParams.story_title, chapter_id: $scope.chapter_id, chapter_index: currentRouteParams.chapter_id},
        withCredentials: true
      })
      .then(function(res) {
        if (res.data && res.data.items) {
          filesService.setFiles(res.data.items.imgUrls);
          $scope.files = filesService.getFiles();
          storiesService.setStory(res.data.items.story_id);
          storiesService.setChapter(res.data.items.chapter_id);
        }
      });

      $scope.$watch('filesService.getFiles()', function(newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
          $scope.files = newVal;
        }
      });

      $scope.addPages = function(files) {
        let story_id = storiesService.getStory();
        let chapter_id = storiesService.getChapter();
        let deleted = filesService.getDeleted();
        let captions = [];
        let text = {};
        let page_id = {};
        let values;

        if ($scope.files) {
          for (let i = 0; i < $scope.files.length; i++) {
            captions.push(text);
            captions[i].text = $scope.files[i].caption;
            if ($scope.files[i].id) {
              captions.push(page_id);
              captions[i].page_id = $scope.files[i].id;
            }
            text = {};
            page_id = {};
            // captions.push([$scope.files[i].caption]);
          }

          Upload.upload({
              url: locationService.origin + '/addPages',
              data: {captions: captions, story_id: story_id, story_title: currentRouteParams.story_title, chapter_id: chapter_id, chapter_index: currentRouteParams.chapter_id, files: $scope.files, deleted: deleted},
              method: 'POST',
              withCredentials: true
          })
          .then(function(res) {
            if (res.data && res.data.items.msg) {
              $scope.$applyAsync(function() {
                values = res.data.items.items;
                for (let ii = 0; ii < values.length; ii++) {
                  $scope.files[ii].chapter_id = values[ii].chapter_id;
                  $scope.files[ii].path = values[ii].path;
                }
              });

              Notification.success(res.data.items.msg);
            } else {
              Notification.error(res.data.msg);
            }
          });
        }
      };

      $scope.mediaQuery = $mdMedia;
    }
  };
}]);
