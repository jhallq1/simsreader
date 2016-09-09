/* jslint node: true */
/* jshint esversion: 6 */
'use strict';

const logger = require('./logger.js'),
      chai = require('chai');

describe('The default logger', function () {
  it('should log without errors', function (done) {
    logger.debug('Test debug', function (err) {
      logger.info('Mocha Logger Test Debug');
      done();
    });
  });
});
