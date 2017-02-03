'use strict';

const insertReport = require('../db/stories/insertReport.js'),
      emailer = require('../db/email/transport.js'),
      logger = require('../logger.js');

let response = {
  log: 'info',
  send: true
};

let email_prams = {
  subject: "New Report",
  template: "report",
  email: "simsreader@gmail.com"
};

function sendReport(story_id, chapter_id, comment_id, flags, explanation, db) {
  return insertReport(story_id, chapter_id, comment_id, flags, explanation, db)
  .then(function(res) {
    if (typeof res === 'number') {
      return emailer(email_prams.subject, null, email_prams.template, email_prams.email, {report_id: res});
    }
  })
  .then(function() {
    response.msg = "Your report has been sent. Thank you.";
    return response;
  })
  .catch(function(error) {
    if (error) return logger.error(error);
  });
}

module.exports = {
  sendReport: sendReport
};
