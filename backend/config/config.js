const isProduction = process.env.NODE_ENV === 'production';

// CORS configuration
const corsConfig = {
    origin: function (origin, callback) {
        const whitelist = isProduction 
            ? ['http://localhost:3002']
            : ['http://localhost:3000'];

        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
};

module.exports = {
    isProduction,
    corsConfig
};

