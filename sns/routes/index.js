var express = require('express');
const { authorizeToken } = require('./middlewares/authorization.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signin/index', { title: 'Outstagram' });
});

router.get('/home', authorizeToken);
router.get('/home', function(req, res, next) {
  res.render('home/index', {title: 'Outstagram'});
});

module.exports = router;
