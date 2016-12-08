var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");



var secret = require('./routes/secret');



var index = require('./routes/index');
var login = require('./routes/login');
var users = require('./routes/users');
var addchannel = require('./routes/addchannel');
var removechannel = require('./routes/removechannel');
var channellist = require('./routes/channellist');
var test = require('./routes/test');
var logout = require('./routes/logout');


var db_init = require('./db/db_init');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({secret: 'ssshhhhh'}));


app.use('/', index);
app.use('/users', users);
app.use('/addchannel', addchannel);
app.use('/removechannel', removechannel);
app.use('/channellist', channellist);
app.use(session({secret: 'ssshhhhh'}));
app.use('/login', login);
app.use('/secret', secret);
app.use('/logout', logout);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
