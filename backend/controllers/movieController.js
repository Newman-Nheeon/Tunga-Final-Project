const { pool } = require('../config/database');

exports.getMovies = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM movies');
        res.json(results.rows);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addMovies = async (req, res) => {
    try {
        const { name, genre, plot, release_date, personal_rating, notes, thumbnailURL } = req.body;
        const result = await pool.query('INSERT INTO movies (name, genre, plot, release_date, personal_rating, notes, thumbnailURL) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id', [name, genre, plot, release_date, personal_rating, notes, thumbnailURL]);
        res.json({ message: 'Movie added', id: result.rows[0].id });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteMovies = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM movies WHERE id = $1', [id]);
        res.json({ message: 'Movie deleted' });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateMovies = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, genre, plot, release_date, personal_rating, notes, thumbnailURL } = req.body;
        await pool.query('UPDATE movies SET name = $1, genre = $2, plot = $3, release_date = $4, personal_rating = $5, notes = $6, thumbnailURL = $7 WHERE id = $8', [name, genre, plot, release_date, personal_rating, notes, thumbnailURL, id]);
        res.json({ message: 'Movie updated' });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};
