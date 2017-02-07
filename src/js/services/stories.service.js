app.factory('storiesService', [function() {
  let story = {};
  let allStories = {};
  let chapter = {};

  function setStory(data) {
    story = data;
  }

  function getStory() {
    return story;
  }

  function setAllStories(data) {
    allStories = data;
  }

  function getAllStories() {
    return allStories;
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
    setAllStories: setAllStories,
    getAllStories: getAllStories,
    setChapter: setChapter,
    getChapter: getChapter
  };

}]);
