import React, { useState, useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStar, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import MovieContext from './MovieContext';


const MovieCard = ({
    id,  // Assuming each movie has an "id" property
    thumbnailURL,
    name,
    genre,
    plot,
    release_date,
    personal_rating,
    notes,
}) => {
  const [deleteMessage, setDeleteMessage] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const context = useContext(MovieContext)

  const deleteMovie = async () => {
    try {
      const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3005';
      const response = await axios.delete(`${BASE_URL}/api/movies/${id}`);
      if (response.status === 200) {
        setDeleteMessage('Movie successfully deleted.');

        // Remove movie from global context
        const updatedMovies = context.movies.filter(movie => movie.id !== id);
        context.setMovies(updatedMovies);

      } else {
        setDeleteError(`Failed to delete movie: ${response.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error deleting the movie:", error);
      setDeleteError('Error occurred while trying to delete movie.');
    }
};


  const generateStars = () => {
    let stars = [];
    for (let i = 0; i < personal_rating; i++) {
      stars.push(<FontAwesomeIcon key={i} style={{color: 'gold'}} icon={faStar} />);
    }
    return stars;
  };

  return (
    <div className="card movie_card">
      {/* <img src={thumbnailURL} className="card-img-top" alt={name} /> */}

      <div className="card-body">
        {deleteMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{deleteMessage}</div>}
        {deleteError && <div style={{ color: 'red', marginBottom: '10px' }}>{deleteError}</div>}
        
        <i className="play_button" data-toggle="tooltip" data-placement="bottom" title="Play Trailer">
          <FontAwesomeIcon icon={faPlay} />
        </i>
        <i className="ml-2" style={{cursor: 'pointer'}} title="Delete Movie" onClick={deleteMovie}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </i>
      
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          <strong>Release Year:</strong> {release_date}
          <br />
          <strong>Genre:</strong> {genre}
          <br />
          <strong>Plot:</strong> {plot}
          <br />
          <strong>Rating:</strong> 
          <span className="movie_rating">
            {generateStars()} 
          </span>
          <br />
          <strong>Notes:</strong> {notes}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
