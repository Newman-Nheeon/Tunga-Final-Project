import React, { createContext, useState } from 'react';

const MovieContext = createContext({
  movies: [],
  setMovies: () => {},
  deleteMovieById: () => {}
});

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  const deleteMovieById = (id) => {
    const updatedMovies = movies.filter(movie => movie.id !== id);
    setMovies(updatedMovies);
  };

  return (
    <MovieContext.Provider value={{ movies, setMovies, deleteMovieById }}>
      {children}
    </MovieContext.Provider>
  );
}

export default MovieContext;
