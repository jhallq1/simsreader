app.factory('filesService', [function() {
  let items = {
    files: [],
    temp: []
  };

  let progress = {show: false};
  let deleted = [];

  function setDeleted(data) {
    deleted.push(data);
    return deleted;
  }

  function getDeleted() {
    return deleted;
  }

  function setProgress(bool) {
    progress.show = bool;
    return progress;
  }

  function getProgress() {
    return progress;
  }

  function setFiles(data) {
    items.files = data;
    return items.files;
  }

  function getFiles() {
    if (items.files.length > items.temp.length) {
      return items.files;
    } else {
      return items.temp;
    }
  }

  function addFiles(data) {
    if (Array.isArray(data)) {
      items.temp = items.files.concat(data);
    }
  }

  return {
    setFiles: setFiles,
    getFiles: getFiles,
    addFiles: addFiles,
    setProgress: setProgress,
    getProgress: getProgress,
    setDeleted: setDeleted,
    getDeleted: getDeleted
  };
}]);
