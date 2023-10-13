const express = require('express');
const { pool } = require('./config/database');
const cors = require('cors');
const bodyParser = require('body-parser');
const movieRouter = require('./routes/movieRouter');
const app = express();



// Middleware
app.use(cors());
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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
