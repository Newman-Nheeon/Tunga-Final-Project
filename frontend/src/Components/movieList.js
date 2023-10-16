import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const MovieList = () => {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    // Fetching the movie data from the provided API using axios
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/movies');
        setMoviesData(response.data);
      } catch (error) {
        console.error("Error fetching the movies:", error);
      }
    };

    // Calling the fetch function inside useEffect
    fetchMovies();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center pb-4">Favourite Movies...</h2>
      <div className="row justify-content-center">
        {moviesData.map(movie => (
          <MovieCard 
            id={movie.id}  
            thumbnailURL={movie.thumbnailURL}
            name={movie.name}
            genre={movie.genre}
            plot={movie.plot}
            release_date={new Date(movie.release_date).getFullYear()} // Extracting the year from release_date
            personal_rating={movie.personal_rating}
            notes={movie.notes}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
