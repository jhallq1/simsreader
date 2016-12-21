app.factory('storiesService', [function() {
  let story = {};

  function setStory(data) {
    story = data;
  }

  function getStory() {
    return story;
  }

  return {
    setStory: setStory,
    getStory: getStory
  };
  
}]);
