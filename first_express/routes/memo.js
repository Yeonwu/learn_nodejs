var init = function() {
    var connectPw = "mongodb+srv://hellobye9290:tmteatn319@cluster0.x9izi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    var express = require('express');
    var router = express.Router();
    var mongoose = require('mongoose');

    mongoose.connect(connectPw, {useNewUrlParser: true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, "connection error: "));
    db.once('open', () => console.log("DB connected"));

    var Schema = mongoose.Schema;
    var Memo = new Schema({
        author: String,
        content: String,
        date: Date
    });

    var memoModel = mongoose.model('Memo', Memo);

    router.get('/', function(req, res, next) {
        res.render('memo');
    });

    router.get('/list', function(req, res, next) {
        memoModel.find({}, function(err, data) {
            res.json(data);
        });
    });

    router.post('/', function(req, res, next) {
        console.log(req);

        var author = req.body.author;
        var content = req.body.content;

        var date = Date.now();

        var memo = new memoModel();

        memo.author = author;
        memo.content = content;
        memo.date = date;

        memo.save(function(err) {
            if(err) {
                res.json({success: false});
                throw err;
            } else {
                res.json({success: true});
            }
        });  
    });

    router.delete('/:_id', function(req, res, next) {
        var _id = req.params._id
        memoModel.deleteOne({_id: _id}, (err) => {
            if(err) {
                res.json({success: false});
                throw err;
            } else {
                res.json({success: true});
            }
        });
    });

    return router;
}

const memo = {
    init: init
}

module.exports = memo;