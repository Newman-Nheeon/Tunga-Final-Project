// Modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Imports
const { pool } = require('./config/database');
const movieRouter = require('./routes/movieRouter');
const { corsConfig } = require('./config/config');

// Middleware
const app = express();
app.use(cors(corsConfig));
app.use(bodyParser.json());

// Database connection check
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
    } else {
        console.log('Connection successful. Server time:', res.rows[0].now);
    }
});

// Routes
app.use('/api', movieRouter);
app.get('/', (req, res) => {
    res.send('Backend Server Running');
  });

// Start the server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
