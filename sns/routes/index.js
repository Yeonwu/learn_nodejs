const express = require('express');
const handlePost = require('./posts');
const { authorizeToken } = require('./middlewares/authorization.js');

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signin/index', { title: 'Outstagram' });
});

router.get('/home', authorizeToken);
router.get('/home', function(req, res, next) {
  res.render('home/index', {title: 'Outstagram'});
});

router.get('/home/post-form', authorizeToken);
router.get('/home/post-form', function(req, res, next) {
  res.render('home/postForm', {title: 'Fill in'});
});

module.exports = router;
