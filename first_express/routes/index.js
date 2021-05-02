var express = require('express');
var router = express.Router();

var page_list = ['test', 'socket'];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Main', page_list: page_list });
});

router.get('/test', function(req, res, next) {
  res.render('test', {title: 'Test'});
});

router.get('/socket', function(req, res, next) {
  res.render('socket', {title: 'socket test'});
});

module.exports = router;
