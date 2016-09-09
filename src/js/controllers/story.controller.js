app.controller('storyController', ['$http', '$scope', function($http, $scope) {

}]);

app.controller('CommentController', function() {
  this.comment = {};

  this.addComment = function(story) {
    chapter.comment.push(this.comment);
  };
});
