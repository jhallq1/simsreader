/* jslint node: true */
/* jshint esversion: 6 */

const expect = require('chai').expect,
      crypto = require('crypto'),
      secret = 'copernicus';

const hash = crypto.createHmac('sha256', secret)
                   .update('The sun hurts my eyes')
                   .digest('hex');

describe ('tokenGenerator: generates random ver token', function () {
  it ('returns a sha256 token of length 64', function() {
    expect(hash).to.have.lengthOf(64);
  });
});
