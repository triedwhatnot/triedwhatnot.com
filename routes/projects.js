var express = require('express');
var router = express.Router();

router.get('/grocery-store', function(req, res, next) {
  res.render('projects/grocery-store.ejs');
});

router.get('/budgety', function(req, res, next) {
  res.render('projects/budgety.ejs');
});

router.get('/estelle-wealth', function(req, res, next) {
  res.render('projects/estelle-wealth.ejs');
});

router.get('/hangman-game', function(req, res, next) {
  res.render('projects/hangman-game.ejs');
});

router.get('/memory-game', function(req, res, next) {
  res.render('projects/memory-game.ejs');
});

router.get('/stock-exchange', function(req, res, next) {
  res.render('projects/stock-exchange.ejs');
});

router.get('/type-racer', function(req, res, next) {
  res.render('projects/type-racer.ejs');
});

module.exports = router;
