var express = require('express');
var router = express.Router();

var page_list = ['test', 'chat', 'bingo'];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Main', page_list: page_list });
});

router.get('/test', function(req, res, next) {
  res.render('test', {title: 'Test'});
});

router.get('/chat', function(req, res, next) {
  res.render('chat', {title: 'chatting room'});
});

router.get('/bingo', function(req, res, next) {
  res.render('bingo', {title: 'Bingo'});
})

module.exports = router;
