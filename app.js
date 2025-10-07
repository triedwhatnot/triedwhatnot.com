var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var projectsRouter = require('./routes/projects');
var dataRouter = require('./routes/data');

var app = express();

if (process.env.NODE_ENV === 'production') {
  // Trust the first proxy in front of your app
  app.set('trust proxy', 1);

  // Middleware to redirect HTTP to HTTPS
  app.use((req, res, next) => {
    console.log(req.headers, req.url)
    if (req.headers['x-forwarded-proto'] !== 'https') {
      // Redirect to HTTPS
      res.redirect(`https://${req.headers.host}${req.url}`);
    } else {
      // Continue to the next middleware or route handler
      next();
    }
  });
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// adding middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// security related headers
app.use((req, res, next)=>{
  // remove server related headers
  res.removeHeader("X-Powered-By");
  res.removeHeader("Server");

  res.setHeader("X-Frame-Options", "deny");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "geolocation=(), microphone=(self), camera=(), fullscreen=(self), autoplay=(self), payment=()");
  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://www.googletagmanager.com https://code.jquery.com https://cdnjs.cloudflare.com https://stackpath.bootstrapcdn.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com https://code.ionicframework.com https://stackpath.bootstrapcdn.com https://use.fontawesome.com; img-src 'self' data: https://images.unsplash.com; connect-src 'self' https://www.google-analytics.com; font-src 'self' https://fonts.gstatic.com https://code.ionicframework.com https://use.fontawesome.com; object-src 'none'; media-src 'self'; frame-src 'self'; child-src 'self'; frame-ancestors 'self'; form-action 'self'; base-uri 'self';");
  


  next();
});

// /api/ routes
app.use('/api/', dataRouter);

// otp-component react app routes
app.use('/projects/otp-component', express.static(path.join(__dirname, 'otp-component', 'dist')));
app.get('/projects/otp-component/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'otp-component', 'dist', 'index.html'));
});

// tic-tac-toe react app routes
app.use('/projects/tic-tac-toe', express.static(path.join(__dirname, 'tic-tac-toe', 'dist')));
app.get('/projects/tic-tac-toe/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'tic-tac-toe', 'dist', 'index.html'));
});

// traffic-light react app routes
app.use('/projects/traffic-light-v2', express.static(path.join(__dirname, 'traffic-light-v2', 'dist')));
app.get('/projects/traffic-light-v2/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'traffic-light-v2', 'dist', 'index.html'));
});

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

// compression logic start

// Middleware to serve Brotli-compressed files if supported
// app.get('*.js', (req, res, next) => {
//   if (req.headers['accept-encoding'].includes('br')) {
//     req.url = req.url + '.br';
//     res.set('Content-Encoding', 'br');
//     res.set('Content-Type', 'application/javascript');
//   }
//   next();
// });

// app.get('*.css', (req, res, next) => {
//   if (req.headers['accept-encoding'].includes('br')) {
//     req.url = req.url + '.br';
//     res.set('Content-Encoding', 'br');
//     res.set('Content-Type', 'text/css');
//   }
//   next();
// });


// // Middleware to serve gzip-compressed files if supported
// app.get('*.js', (req, res, next) => {
//   if (req.headers['accept-encoding'].includes('gzip') && !req.headers['accept-encoding'].includes('br')) {
//     req.url = req.url + '.gz';
//     res.set('Content-Encoding', 'gzip');
//     res.set('Content-Type', 'application/javascript');
//   }
//   next();
// });

// app.get('*.css', (req, res, next) => {
//   if (req.headers['accept-encoding'].includes('gzip') && !req.headers['accept-encoding'].includes('br')) {
//     req.url = req.url + '.gz';
//     res.set('Content-Encoding', 'gzip');
//     res.set('Content-Type', 'text/css');
//   }
//   next();
// });
// // compression logic end


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
