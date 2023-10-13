const express = require('express');
const router = express.Router();
const { getMovies, addMovies, deleteMovies, updateMovies } = require('../controllers/movieController');

router.get('/movies', getMovies);

router.post('/movies', addMovies);

router.delete('/movies/:id', deleteMovies);

router.put('/movies/:id', updateMovies);

module.exports = router;
