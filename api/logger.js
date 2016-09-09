/* jslint node: true */
/* jshint esversion: 6 */

'use strict';
const winston = require('winston');

winston.handleExceptions(new winston.transports.File({ filename: 'logs/error.log' }));

let logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      name: 'error',
      level: 'error',
      filename: 'logs/error.log',
      json: true,
      timestamp: true
    }),
    new (winston.transports.File)({
      name: 'warn',
      level: 'warn',
      filename: 'logs/warn.log',
      json: true,
      timestamp: true
    }),
    new (winston.transports.File)({
      name: 'info',
      level: 'info',
      filename: 'logs/info.log',
      json: true,
      timestamp: true
    }),
    new (winston.transports.File)({
      name: 'db',
      level: 'info',
      filename: 'logs/db.log',
      json: true,
      timestamp: true
    })
  ],
  exitOnError: false
});

winston.addColors({
    info: 'green',
    warn: 'cyan',
    error: 'red',
    verbose: 'blue',
});

module.exports = logger;
