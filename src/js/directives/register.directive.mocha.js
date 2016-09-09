describe('register directive', function() {
  var $http, Notification, locationService, $compile, $rootScope, template;

  beforeEach(module('simsReader', 'views/registerForm.html'));

  beforeEach(inject(function(_$http_, _Notification_, _locationService_, _$compile_, _$rootScope_) {
    $http = _$http_;
    Notification = _Notification_;
    locationService = _locationService_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    template = $templateCache.get('views/registerForm.html');
    $templateCache.put('/src/js/views/registerForm.html', template);
  }));

  it('replaces the element with the appopriate content', function() {
    var element = $compile("<register></register")($rootScope);
    $rootScope.digest();
    expect(element.html()).toContain('js/views/registerForm.html');
  });
});
