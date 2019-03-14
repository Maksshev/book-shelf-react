const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE_URI: process.env.DATABASE_URI
    },
    default: {
        SECRET: 'SUPERSECRET1234567',
        DATABASE_URI: 'mongodb://localhost:27017/bookShelf'
    }
};

exports.get = function get(env) {
    return config[env] || config.default
};