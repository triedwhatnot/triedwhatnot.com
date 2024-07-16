var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var projectsRouter = require('./routes/projects');
var dataRouter = require('./routes/data');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// adding middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// /api/ routes
app.use('/api/', dataRouter);

// voice2post react app routes
app.use('/projects/voice2post', express.static(path.join(__dirname, 'voice2post', 'dist')));
app.get('/projects/voice2post/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'voice2post', 'dist', 'index.html'));
});

// react-testing-suite react app static resources route
app.use('/projects/react-testing-suite', express.static(path.join(__dirname, 'react-testing-suite', 'coverage')));
app.use('/projects/react-testing-suite', express.static(path.join(__dirname, 'react-testing-suite', 'dist')));

// react-testing-suite coverage-report routes
app.get('/projects/react-testing-suite/coverage-report', (req, res) => {
  res.sendFile(path.join(__dirname, 'react-testing-suite', 'coverage', 'index.html'));
});

// react-testing-suite react app routes
app.get('/projects/react-testing-suite/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'react-testing-suite', 'dist', 'index.html'));
});

// all static resources
app.use(express.static(path.join(__dirname, 'public')));

// project routes
app.use('/projects', projectsRouter);

// index routes
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
