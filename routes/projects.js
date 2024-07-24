var express = require('express');
var router = express.Router();

router.get('/grocery-store', function(req, res, next) {
  res.render('projects/grocery-store-min.ejs');
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
