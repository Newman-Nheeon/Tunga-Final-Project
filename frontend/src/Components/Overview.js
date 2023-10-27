import React, { useState } from 'react';
import { MovieProvider } from './MovieContext';
import NavbarComponent from './NavBar';
import AddMovieModal from './AddMovie';
import SearchAndSortArea from './Search&Sort';
import MovieList from './movieList';


const Overview = () => {
  const [show, setShow] = useState(false);  // State to control the visibility of the modal
  const [moviesData, setMoviesData] = useState([]);  // State for the list of movies

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleMovieAdded = (newMovie) => {
    setMoviesData(prevMovies => [...prevMovies, newMovie]);
  };

  const handleMoviesUpdate = (movies) => {
    setMoviesData(movies);
  };

  return (
    <div>
      <MovieProvider>
        <NavbarComponent handleShow={handleShow} />
        <AddMovieModal show={show} handleClose={handleClose} onMovieAdded={handleMovieAdded} />
        <SearchAndSortArea onSort={handleMoviesUpdate} />
        <MovieList movies={moviesData} />
      </MovieProvider>
    </div>
  );
}

export default Overview;
