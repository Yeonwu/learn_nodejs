var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userPostSchema = new Schema(
    {
        name: String,
        email: String,
        pw: String,
        created: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model('user', userPostSchema);