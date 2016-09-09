app.service('locationService', function() {
  return {
    origin: window.location.protocol + "//" + window.location.hostname + ':2112'
  };
});
