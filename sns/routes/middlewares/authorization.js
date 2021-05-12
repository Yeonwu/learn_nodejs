var config = require(process.env.SERVER_CONFIG);
const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const userSchema = require('../../model/user-post');

const decodeToken = function(token) {
    console.log('Authorization start.');
    const secretKey = config.TOKEN.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey);

    console.log('Decoding.');

    if(!decoded) {
        console.log('Failed. Unauthorized token.');
        return false;
    }

    return decoded;
}

const _authorizeToken = async function (req, res, next) {
    const decoded = decodeToken(req.cookies.a_token);

    try {
        if (!decoded) {
            return res.status(405)
            .json({message: 'Unauthorized token'});
        }

        const isUser = await userSchema.findById(decoded._id);

        console.log('Successfully searched db.');
        console.log(JSON.stringify(isUser));
        if(!isUser) {
            console.log('Fail. No Such User: ' + JSON.stringify(decoded));
            return res.status(404)
            .json({message: 'No Such User'});

        } else {
            console.log('Authorization finished');
            next();
        }
    } catch(err) {
        next(createHttpError(500));
    }
}

module.exports = {
    authorizeToken: _authorizeToken,
};