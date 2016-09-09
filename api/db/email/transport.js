const nodemailer = require('nodemailer'),
      secrets = require('./email.secrets.json');

let transporter = nodemailer.createTransport(secrets);

let mainOptions = {
  from: 'noreply@simsreader.com',
  to: user.email,
  subject: 'Please verify your simsreader account',
  text: 'hello world'
};

transporter.sendMail(mainOptions, function(err, info) {
  if (err) {
    throw err;
  }
});
