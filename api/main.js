/* jslint node: true */
/* jshint esversion: 6 */

'use strict';
var Promise = require('bluebird');

global.apiPath = __dirname.split('\\').join('/');

const express = require('express'),
      port = 2112,
      register = require('./users/register.js'),
      login = require('./users/login.js'),
      bodyParser = require('body-parser'),
      app = express(),
      db = require('./db/db.conn.js'),
      logger = require('./logger.js'),
      session = require('express-session'),
      MySQLStore = require('express-mysql-session')(session),
      crypto = require('crypto'),
      cookieParser = require('cookie-parser'),
      secrets = require('./db/secrets.json'),
      updateTimestamp = require('./db/user/updateTimestamp.js'),
      userToken = require('./db/user/verifyToken.js'),
      colors = require('colors'),
      emailer = require(`${global.apiPath}/db/email/transport.js`),
      requestTempPassword = require('./users/forgotPassword.js'),
      resetPassword = require('./users/resetPassword.js'),
      checkExpiration = require('./db/user/isPwTokenValid.js'),
      checkEmail = require('./db/user/getUserByEmail.js'),
      validator = require('./users/util/registrationValidator.js'),
      toSimpleUser = require('./users/toSimpleUser.js'),
      createNewStory = require('./stories/createStory.js'),
      getStories = require('./db/stories/getStoriesByUserId.js');

app.use(cookieParser('sugar_cookie'));

db.init();

app.use(session({
  secret: 'extrabutter',
  name: 'croissant',
  store: new MySQLStore(secrets, function() {
    return db.init()
    .then(function(res) {
      return res;
    });
  }),
  resave: true,
  saveUninitialized: false,
  cookie: { secure: false },
  genid: function(req) {
    return crypto.randomBytes(10).toString('hex');
  }
}));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**************************/
/* User calls
/**************************/
app.post('/getUserByEmail', function (req, res) {
  return validator.registrationValidator(req.body.email)
  .then(function(response) {
    return checkEmail.getUserByEmail(req.body.email)
    .then(function(response) {
      return responseHandler({items: response, send: true}, res);
    });
  })
  .catch(function(error) {
    return responseHandler(error, res);
  });
});

/**************************/
/* Register calls
/**************************/
app.post('/register', function (req, res) {
  return register.registerUser(req.body)
  .then(function(response) {
    return responseHandler(response, res);
  })
  .catch(function(error) {
    return responseHandler(error, res);
  });
});

/**************************/
/* Login calls
/**************************/
app.post('/login', function(req, res) {
  return login.loginUser(req.body)
  .then(function(response) {
    req.session.isloggedin = true;
    req.session.user = toSimpleUser(response.items);

    updateTimestamp(db.conn(), req.body.email)
    .catch(function(error) {
      logger.error('updateTimestamp: ', error);
    });
    return responseHandler(response, res);
  })
  .catch(function(error) {
    return responseHandler(error, res);
  });
});

app.get('/logout', function(req, res) {
  req.session.isloggedin = false;
  return responseHandler({msg: "Goodbye!", items: {}, send: true}, res);
});

app.get('/isloggedin', function(req, res) {
  if (!req.session || !req.session.isloggedin) {
    return responseHandler({msg: 'Please login', send: true}, res);
  }

  return responseHandler({items: req.session.user, send: true}, res);
});

/**************************/
/* verify token
/**************************/
app.get('/verify/:verification_token', function(req, res) {
  return userToken.verifyToken(req.params.verification_token, db.conn())
  .then(function(response) {
    return responseHandler(response, res);
  })
  .catch(function(error) {
    return responseHandler(error, res, 401);
  });
});

/**************************/
/* request password reset
/**************************/
app.post('/forgotPassword', function(req, res) {
  if (req.session.isloggedin) {
    return responseHandler({"msg": "Cannot recover password while logged in."}, res, 401);
  }

  return requestTempPassword.forgotPassword(req.body.email)
  .then(function(response) {
    return responseHandler(response, res);
  })
  .catch(function(error) {
    return responseHandler(error, res);
  });
});

/**************************/
/* reset password
/**************************/
app.get('/resetPassword/:passwordToken', function(req, res) {
  return checkExpiration.isPwTokenValid(db.conn(), req.params.passwordToken)
  .then(function(response) {
    return responseHandler(response, res);
  })
  .catch(function(error) {
    return responseHandler(error, res, 401);
  });
});

app.post('/resetPassword', function(req, res) {
  if (req.session.isloggedin) {
    return responseHandler({"msg": "Cannot reset while logged in."}, res, 401);
  }

  return resetPassword.checkExp(req.body, db.conn())
  .then(function(response) {
    if (response === true) {
      return resetPassword.resetPassword(req.body, db.conn());
    }
    return responseHandler({msg: 'This link has already expired.', send: true}, res);
  })
  .then(function(response) {
    return responseHandler(response, res);
  })
  .catch(function(error) {
    return responseHandler(error, res);
  });
});

/**************************/
/* story calls
/**************************/
app.post('/createStory', function(req, res) {
  return createNewStory.createStory(req.body, req.session.user, req.sessionID, db.conn())
  .then(function(response) {
    return responseHandler(response, res);
  })
  .catch(function(error) {
    return responseHandler(error, res);
  });
});

app.get('/getStories', function(req, res) {
  return getStories.getStoriesByUserId(req.session.user, db.conn())
  .then(function(response) {
    return responseHandler({items: response, send: true}, res);
  })
  .catch(function(error) {
    return responseHandler(error, res);
  });
});

/**************************/
/* response handler
/**************************/
function responseHandler(response, res, statusCode) {
  if (!response) {
    logger.error('No response passed to response handler');
    if (res) {
      res.end(400, "Internal error has occurred.");
    }

    return false;
  }

  if (response && response.log) {
    logger[response.log](response.msg, response.logmsg);
  }

  //
  //TODO: Jen -- write test for this
  // Justin -- make recursive
  //
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

  if (statusCode) {
    res.statusCode = statusCode;
  }

  if (res && response.send) {
    if (response.redirect) {
      res.send(JSON.stringify({"msg": response.msg, "items": response.items, "redirect": true}));
    } else {
      res.send(JSON.stringify({"msg": response.msg, "items": response.items}));
    }
  }

  if (response.send && !res) {
    return logger.error('No http.res passed to response handler');
  }

  if (res) res.end();
}

app.listen(port, function() {
  console.log(`\nListening on port ${port}\n`.cyan);
});
