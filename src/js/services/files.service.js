app.factory('filesService', [function() {
  let items = {
    files: []
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
    return items.files;
  }

  function addFiles(data) {
    if (Array.isArray(data)) {
      items.files = items.files.concat(data);
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
