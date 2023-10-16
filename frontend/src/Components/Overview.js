import React, { useState } from 'react';

import NavbarComponent from './NavBar';
import AddMovieModal from './AddMovie';
import SearchArea from './Search';
import SortArea from './sort';
import MovieList from './movieList';

const Overview = () => {
  const [show, setShow] = useState(false);  // State to control the visibility of the modal
  const [moviesData, setMoviesData] = useState([]);  // State for the list of movies

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleMovieAdded = (newMovie) => {
    setMoviesData(prevMovies => [...prevMovies, newMovie]);
  };

  return (
    <div>
      <NavbarComponent handleShow={handleShow} />
      <AddMovieModal show={show} handleClose={handleClose} onMovieAdded={handleMovieAdded} />
      <SearchArea />
      <SortArea />
      <MovieList movies={moviesData} />
    </div>
  );
}

export default Overview;
