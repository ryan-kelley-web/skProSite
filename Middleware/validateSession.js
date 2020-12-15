const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/userModel');

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('token -->', token);

    if (!token) {
        return res.status(402).send(
            {
                auth: false,
                message: 'No token provided.'
            }
        )
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
        //.verify(token, secretOrPublicKey, [options,callback])----params
        console.log('decodeToken -->', decodeToken);

            if (!err && decodeToken) {
                User.findOne(
                    {
                        where: { id: decodeToken.id }
                    }
                )
                    .then((user) => {
                        
                        console.log('user -->', user);
                        if (!user) throw err;
                        
                        console.log('req -->', req);
                        req.user = user;
                        return next();
                    })
                    .catch((err) => next(err))
            } else {
                req.errors = err;
                return res.status(500).send('Not authorized.')
            }
        })
    }
};

module.exports = validateSession;