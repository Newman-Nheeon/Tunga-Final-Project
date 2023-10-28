import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import MovieContext from './MovieContext';



const MovieList = () => {
  const context = useContext(MovieContext);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3005';


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/movies`);
        context.setMovies(response.data); // Assuming setMovies is a function in your context
      } catch (error) {
        console.error("Error fetching the movies:", error);
      }
    };
    fetchMovies();
  }, []);

  console.log("Movies in MovieList:", context.movies); // Check the data before rendering the movie cards

  return (
    <div className="container mt-5">
      <h2 className="text-center pb-4">Favourite Movies...</h2>
      <div className="row justify-content-center">
        {context.movies.map(movie => (
          
          <MovieCard 
            key={movie.id} 
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
