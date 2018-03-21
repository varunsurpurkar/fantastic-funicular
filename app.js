var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var engines = require('consolidate');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/mean-chat')
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

var chat = require('./routes/chat');
var feeds = require ('./routes/feeds');


var app = express();
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/chat', chat);
app.use('/feeds',feeds);
app.use('/feeds/profileData',feeds);
app.use('/feeds/profileCreate',feeds);
app.use('/feeds/profileUpdate',feeds);
app.use('/feeds/feedBy',feeds);
app.use('/feeds/profiles/profileDataBySearchCriteria',feeds);
app.use('/feeds/auth/forgotpassword',feeds);

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
  console.log(res.locals.error);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
