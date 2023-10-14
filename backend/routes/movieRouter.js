const express = require('express');
const router = express.Router();
const { getMovies, addMovies, deleteMovies, updateMovies } = require('../controllers/movieController');
const { searchMoviesByName, sortMovies } = require('../controllers/featuresController');

router.get('/movies', getMovies);

router.post('/movies', addMovies);

router.delete('/movies/:id', deleteMovies);

router.put('/movies/:id', updateMovies);

router.get('/movies/search', searchMoviesByName);

router.get('/movies/sort', sortMovies);


module.exports = router;
