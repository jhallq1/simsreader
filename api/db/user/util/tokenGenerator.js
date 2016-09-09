const crypto = require('crypto'),
      secret = crypto.randomBytes(10);

module.exports = crypto.createHmac('sha256', secret)
                       .update('The sun hurts my eyes')
                       .digest('hex');
