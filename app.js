var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var multer = require("multer");
var fileUpload = require('express-fileupload');
var vidStreamer = require("vid-streamer");


var secret = require('./routes/secret');
var index = require('./routes/index');
var login = require('./routes/user/login');
var join = require('./routes/user/join');
var users = require('./routes/users');
var addchannel = require('./routes/admin/addchannel');
//var adduser = require('./routes/admin/adduser');
var removechannel = require('./routes/admin/removechannel');
var removeuser = require('./routes/admin/removeuser');
var channellist = require('./routes/channellist');
var sendtochannel = require('./routes/sendtochannel');
var test = require('./routes/test');
var logout = require('./routes/user/logout');
var upload = require('./routes/upload');
var admin = require('./routes/admin/admin');
var streamer = require("./routes/streamer.js");
var video = require("./routes/video.js");
var drop_db = require("./routes/admin/drop_database.js");
var video_test = require("./routes/video_test");

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
app.use(fileUpload());

app.use(session({secret: 'ssshhhhh'}));

app.use('/', index);
app.use('/users', users);
app.use('/addchannel', addchannel);
app.use('/removechannel', removechannel);
app.use('/removeuser', removeuser);
app.use('/channellist', channellist);
app.use('/sendtochannel', sendtochannel);
app.use('/login', login);
app.use('/secret', secret);
app.use('/logout', logout);
app.use('/upload', upload);
app.use('/join', join);
app.use('/admin', admin);
//app.use('/adduser', adduser);
app.use('/streamer', streamer);
app.use('/video', video);
app.use('/delete', drop_db);
app.use('/video_test', video_test);



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
