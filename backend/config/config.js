const isProduction = process.env.NODE_ENV === 'production';

// CORS configuration
const corsConfig = {
    origin: function (origin, callback) {
        const whitelist = isProduction 
            ? ['https://tunga-final-project-zp6p.vercel.app']
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

