require('./plugins/dateFormat');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

console.log("\n================Robot web server================")
console.log(`================Start at ${(new Date()).Format('yyyy-MM-dd hh:mm:ss')}================`)

//global var
global.heartbeatGenerator = require("./plugins/heartbeat");
global.robotID = null;

//init robot id
var idFile = require('./config').idFile;
var readFile = require('fs').readFile;
readFile(idFile, {encoding: 'utf8'}, (err, data)=>{
  if(err){
    console.log('Get robot id fail!');
    return;
  }
  console.log("Get robot id success!");
  global.robotID = JSON.parse(data).id;
  global.heartbeatGenerator.start();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.pretty = true;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routers def
var index = require('./routes/index');
var logs = require('./routes/logs');
var monitor = require('./routes/monitor');
var idInit = require('./routes/idInit');
var data_list = require('./routes/data');
app.use('/', index);
app.use('/logs', logs);
app.use('/monitor', monitor);
app.use('/idInit', idInit);
app.use('/data', data_list);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    title: "error",
    message: err.message,
    error: {}
  });
});


module.exports = app;
