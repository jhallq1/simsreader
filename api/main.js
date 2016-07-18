'use strict';
/* jslint node: true */
/* jshint esversion: 6 */

const express = require('express'),
      port = 2112,
      register = require('./db/register.js'),
      bodyParser = require('body-parser'),
      app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/register', function (req, res) {
  register.checkUser(req.body)
  .then(function(response) {
    res.send(response);
    res.end();
  })
  .catch(function(error) {
    res.send(error);
    res.end();
  });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
