// describe('Main Controller', function() {
//
//   var httpBackend, userService, timeout, response, rootScope;
//
//   beforeEach(module('simsReader'));
//
//   beforeEach(inject(function ($httpBackend, _userService_, _$timeout_, _$rootScope_) {
//     httpBackend = $httpBackend;
//     userService = _userService_;
//     timeout = _$timeout_;
//     rootScope = _$rootScope_;
//   }));
//
//   afterEach(function() {
//     httpBackend.verifyNoOutstandingExpectation();
//     httpBackend.verifyNoOutstandingRequest();
//   });
//
//   it ('should call isloggedin', function() {
//     httpBackend.expectGET(window.location.protocol + "//" + window.location.hostname + ':2112/isloggedin').respond(200, true);
//     httpBackend.flush();
//     timeout(function() {
//       expect(userService.isloggedin()).to.equal(true);
//     }, 500);
//   });
// });
