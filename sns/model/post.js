var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema(
    {
        title: String,
        content: String,
        writer: {
            name: String,
            email: String,
            
        },
        created: {
            type: Date,
            default: Date.now
        },
    }
);

Post.statics.getAll = async function() {
    return this.find();
};

Post.statics.getByPage = async function(pageNum, postPerPage) {
    var startIdx = postPerPage * (pageNum - 1);
    return this.find().skip(startIdx).limit(pageNum);
}

module.exports = mongoose.model('post', Post);