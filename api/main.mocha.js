/* jslint node: true */
/* jshint esversion: 6 */
'use strict';
const expect = require('chai').expect;

let testObj = {};
let response = {};

let userResponseError = {
  log: "warn",
  send: true,
  msg: 'you did it wrong'
};

function responseHandler(response, res) {
  if (!response) {
    testObj.logger = "no response passed";
    return false;
  }

  if (response && response.log) {
    testObj.logger = response.msg;
    testObj.level = response.log;
  }

  if (res && response.send) {
    testObj.send = response.msg;
  }

  if (response.send && !res) {
    testObj.logger = 'try to send msg without http.res';
  }

  if (res) return true;
}

function resp(response) {
  if (typeof response.msg === "object") {
    let msgStr = "";
    let keys = Object.keys(response.msg);
    let count = 1;
    keys.forEach(function(key) {
      msgStr += response.msg[key].toString();
      if (count < keys.length) {
        msgStr += ", ";
      }
      count ++;
    });

    response.msg = msgStr;
  }
}

describe ('responseHandler & errorHandler', function() {
  beforeEach('resetObj', function() {
    testObj = {};
    response = {
      msg: {
        key: "value",
        key2: "value2"
      }
    };
  });

  it ('checks for sends without http.res', function() {
    responseHandler(userResponseError, null);
    expect (testObj.logger).to.equal('try to send msg without http.res');
    expect (testObj.level).to.equal('warn');
  });

  it ('checks for sends with http.res', function() {
    responseHandler(userResponseError, true);
    expect (testObj.send).to.equal('you did it wrong');
    expect (testObj.level).to.equal('warn');
  });

  it ('checks for log response', function() {
    responseHandler(userResponseError, true);
    expect (testObj.logger).to.equal('you did it wrong');
    expect (testObj.level).to.equal('warn');
  });

  it ('checks for send and res', function() {
    expect (responseHandler(userResponseError, true)).to.equal(true);
    expect (testObj.level).to.equal('warn');
  });

  it ('checks for no response', function() {
    expect (responseHandler(null, true)).to.equal(false);
  });

  it ('checks for object and converts to string', function() {
    resp(response);
    expect (response.msg).to.equal('value, value2');
  });
});
