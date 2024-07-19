var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', {
    activeNavbarEl: "home",
    baseUrl: ""
  });
});

router.get('/work', function(req, res, next) {
  res.render('work', {
    activeNavbarEl: "work",
    baseUrl: ""
  });
});

router.get('/resources', function(req, res, next) {
  res.render('resources', {
    activeNavbarEl: "resources",
  });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', {
    activeNavbarEl: "contact",
  });
});

router.get('/*', function(req, res, next) {
  res.send('Not Found!!');
});

module.exports = router;
