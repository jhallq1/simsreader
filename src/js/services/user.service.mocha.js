// describe('User service', function() {
//
//   var userService, httpBackend, rootScope, templateCache, email;
//
//   beforeEach(module('simsReader'));
//
//   beforeEach(inject(function (_userService_, $httpBackend, _$rootScope_) {
//     userService = _userService_;
//     httpBackend = $httpBackend;
//     rootScope = _$rootScope_;
//   }));
//
//   afterEach(function() {
//     httpBackend.verifyNoOutstandingExpectation();
//     httpBackend.verifyNoOutstandingRequest();
//     httpBackend.flush();
//   });
//
//   it('should return user', function() {
//
//     httpBackend.expectPOST(window.location.protocol + "//" + window.location.hostname + ':2112/getUserByEmail').respond(200, 'test@test.com');
//     return userService.getUserByEmail(email)
//       .then(function(res) {
//         console.log("res:", res);
//         return expect(res.data.email).toEqual('test@test.com');
//       });
//     });
// });
