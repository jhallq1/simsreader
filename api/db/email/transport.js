'use strict';

const nodemailer = require('nodemailer'),
      secrets = require('./email.secrets.json'),
      fs = require('fs');

let transporter = nodemailer.createTransport(secrets);

module.exports = function emailer(subject, text, template, recipient, variables) {
  return new Promise(function(resolve, reject) {
    return fs.readFile(`${global.apiPath}/db/email/templates/${template}.email.html`, function(err, html) {
      if (err) {
        return reject(err);
      }

      var send = transporter.templateSender({
          subject: subject,
          text: text,
          html: html
      }, {
          from: 'noreply@simsreader.com',
      });

      return send(
        { to: recipient }, variables,
        function(err, info) {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        }
      );
    });
  });
};
