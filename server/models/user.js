const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    name: {
        type: String,
        maxlength: 100
    },
    lastName: {
        type: String,
        maxlength: 100
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String,
        default: null
    }
});


userSchema.pre('save', function(next) {
    const user = this;
    if (user.isModified('password')) {

        bcrypt.genSalt(SALT_I, (err, salt) => {

            if (err) return next(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                user.password = hash;
                next();
            })

        })

    } else {
        next();
    }
});


userSchema.methods.comparePassword = function (candidatePassword, cb) {
    const user = this;
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    })
};


userSchema.methods.generateToken = function (cb) {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), config.SECRET);
    user.token = token;
    user.save((err, user) => {
        if (err) return cb(err);
        cb(null, user);
    })
};


userSchema.methods.deleteToken = function(cb) {
    const user = this;

    User.findOneAndUpdate({_id: user._id}, {token: null}, {returnNewDocument: false}, (err, user) => {
        if (err) return cb(err);
        cb(null, {tokenDeleted: true});
    })
};


userSchema.statics.findByToken = function (token, cb) {
    const user = this;
    jwt.verify(token, config.SECRET, (err, decode) => {
        user.findOne({_id: decode, token}, {password: 0}, (err, user) => {
            if (err) return cb(err);
            cb(null, user);
        })
    })
};


const User = mongoose.model('User', userSchema);

module.exports = User;