var config = require(process.env.SERVER_CONFIG);
var express = require('express');
const jwt = require('jsonwebtoken');
const userSchema = require('../model/user-post');

var router = express.Router();

router.post('/auth', function(req, res, next) {

  const {name, email, pw} = req.body;

  userSchema
    .find({name: name, pw: pw})
    .then(found => {
      var userNotFound = !found || !found.length;
      var message = '';
      var status = 200;
      var token = undefined;

      if(userNotFound) {
        message = "There is no such user. Please check name and password.";
        status = 400;
      } else {
        message = "Successfully signed in";
        token = createToken(found[0]._id);
      }

      res.status(status);
      res.json({message: message, token: token});
    })
    .catch(err => {
      res.status(500)
      res.json({message: "Failed to sign in due to internal error"});
      console.error(err);
    });
});

function createToken(_id) {
  const payload = {
    _id: _id,
  };
  const options = {
    expiresIn: '7d',
  };
  const SECRET_KEY = config.TOKEN.SECRET_KEY;

  return jwt.sign(payload, SECRET_KEY, options);
}

router.post('/new', function(req, res, next) {
  try{
    const {name, email, pw} = req.body;

    var model = new userSchema();

    model.name = name;
    model.email = email;
    model.pw = pw;

    model
      .save()
      .then(() => {
        res.status(200)
        res.json({message: "Successfully registered"});
      })
      .catch(err => {
        res.status(500)
        res.json({message: "Failed to register due to internal error"});
        console.error(err);
      });
    } catch (err) {
      console.error(err);
    }
});

module.exports = router;
