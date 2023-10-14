const isProduction = process.env.NODE_ENV === 'production';

// CORS configuration
const corsConfig = {
    origin: function (origin, callback) {
        const whitelist = isProduction 
            ? ['https://yourfrontenddomain.com']
            : ['http://localhost:3001'];

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

