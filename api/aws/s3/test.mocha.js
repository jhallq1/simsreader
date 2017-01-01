const create = require('./s3_create_user_asset_key.js'),
      expect = require('chai').expect;

describe('s', function() {
  it('makes bin', function() {
    return create.createUAK('user/test/init')
    .then(function(res){
      console.log(res);
      expect(true).to.equal(true);
    });
  });
});
