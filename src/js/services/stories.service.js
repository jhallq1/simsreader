app.factory('storiesService', [function() {
  let story = {};
  let chapter = {};

  function setStory(data) {
    story = data;
  }

  function getStory() {
    return story;
  }

  function setChapter(data) {
    chapter = data;
  }

  function getChapter() {
    return chapter;
  }

  return {
    setStory: setStory,
    getStory: getStory,
    setChapter: setChapter,
    getChapter: getChapter
  };

}]);
