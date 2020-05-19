// Import required modules
var express = require('express');
var router = express.Router();

// GET: route for home-page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PMS | Home' });
});

// GET: route for contact-us page
router.get('/contact', function (req, res, next) {
  res.render('contact', { title: 'Contact us' });
})

// GET: route for about-us page
router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About us' });
})

module.exports = router;
