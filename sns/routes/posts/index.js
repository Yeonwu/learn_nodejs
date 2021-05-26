const express = require('express');
const router = express.Router();
const Post = require(__base + '/model/post');

router.get('/', async function(req, res, next) {
    Post.getAll()
        .then(found => {
            console.log(found);
            res.status(200)
               .json(found);
        })
        .catch(err => {
            console.error(err);
        });
});

router.get('/page/:pageNum/size:postPerPage', function(req, res, next) {

});

router.post('/', function(req, res, next) {
    const { title, content, writer} = req.body;

    var newPost = new Post();
    newPost.title = title;
    newPost.content = content;
    newPost.writer.name = writer;

    newPost.save();

    res.redirect('http://localhost:3000/home');
})

module.exports = router;