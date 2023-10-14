const { pool } = require('../config/database');


// Movie Search

exports.searchMoviesByName = async (req, res) => {
    try {
        // Extract movie name from query parameters
        const movieName = req.query.name;
        
        if (!movieName) {
            return res.status(400).json({ message: 'Please provide a movie name to search.' });
        }

        // Use the LIKE clause for a case-insensitive search
        const results = await pool.query('SELECT * FROM movies WHERE LOWER(name) LIKE LOWER($1)', [`%${movieName}%`]);

        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'No movies found with the given name.' });
        }

        res.json(results.rows);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};

// Sorting

exports.sortMovies = async (req, res) => {
    try {
        // Extract sort criteria from query parameters
        const sortBy = req.query.sortBy || 'name';  // Default is 'name'
        
        let orderBy;
        let sortOrder = 'ASC';  // Default sort order
        switch (sortBy) {
            case 'name':
                orderBy = 'name';
                break;
            case 'release_date':
                orderBy = 'release_date';
                break;
            case 'rating':
                orderBy = 'personal_rating';
                sortOrder = 'DESC';  // Sorting ratings from highest to lowest
                break;
            default:
                return res.status(400).json({ message: 'Invalid sort criteria.' });
        }

        const results = await pool.query(`SELECT * FROM movies ORDER BY ${orderBy} ${sortOrder}`);

        res.json(results.rows);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};

