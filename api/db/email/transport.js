'use strict';

const nodemailer = require('nodemailer'),
      secrets = require('./email.secrets.json'),
      fs = require('fs');

let transporter = nodemailer.createTransport(secrets);

module.exports = function emailer(subject, text, template, recipient, variables) {
  return new Promise(function(resolve, reject) {
    return fs.readFile(`db/email/templates/${template}.email.html`, function(error, html) {
      if (error) {
        return reject(error);
      }

      var send = transporter.templateSender({
          subject: subject,
          text: text,
          html: html
      }, {
          from: 'simsreader@gmail.com',
      });

      return send(
        { to: recipient }, variables,
        function(error, info) {
          if (error) {
            return reject(error);
          }
          return resolve(true);
        }
      );
    });
  })
  .catch(function(error) {
    throw error;
  });
};
