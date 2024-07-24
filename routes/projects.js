var express = require('express');
var router = express.Router();

// router.get("*", (req, res, next) => {
//   if (req.headers['accept-encoding'].includes('br')) {
//     req.compressionExtension = '.br';
//     res.set('Content-Encoding', 'br');
//     res.set('Content-Type', 'text/html');
//   }
//   else if (req.headers['accept-encoding'].includes('gzip') && !req.headers['accept-encoding'].includes('br')) {
//     req.compressionExtension = '.gz';
//     res.set('Content-Encoding', 'gzip');
//     res.set('Content-Type', 'text/html');
//   }
//   else req.compressionExtension = '';
//   next();
// });

router.get('/grocery-store', function(req, res, next) {
  res.render(`projects/grocery-store-min.ejs`);
});

router.get('/budgety', function(req, res, next) {
  res.render('projects/budgety-min.ejs');
});

router.get('/estelle-wealth', function(req, res, next) {
  res.render('projects/estelle-wealth-min.ejs');
});

router.get('/hangman-game', function(req, res, next) {
  res.render('projects/hangman-game-min.ejs');
});

router.get('/memory-game', function(req, res, next) {
  res.render('projects/memory-game-min.ejs');
});

router.get('/stock-exchange', function(req, res, next) {
  res.render('projects/stock-exchange-min.ejs');
});

router.get('/type-racer', function(req, res, next) {
  res.render('projects/type-racer-min.ejs');
});

router.get('/', function(req, res, next) {
  res.send('Not Found!!');
});

module.exports = router;
