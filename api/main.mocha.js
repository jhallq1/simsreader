/* jslint node: true */
/* jshint esversion: 6 */
const expect = require('chai').expect;

function jen(num1, num2) {
  return num1 + num2;
}

describe ('adds two numbers', function() {
  it ('adds 3 and 5', function() {
    expect(jen(3, 5)).to.equal(8);
  });

  it ('adds 11 and 14', function() {
    expect(jen(11, 14)).to.equal(25);
  });
});
