const User = require('../models/user');

const auth = (req, res, next) => {
    const token  = req.cookies.token;
    User.findByToken(token, (err, user) => {
        if (err || !user) return res.json({
            isAuth: false
        });

        req.token = token;
        req.user = user;

        next();
    })
};

module.exports = auth;