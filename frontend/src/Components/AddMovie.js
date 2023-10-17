import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const AddMovieModal = ({ show, handleClose, onMovieAdded }) => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [plot, setPlot] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [personalRating, setPersonalRating] = useState('');
  const [notes, setNotes] = useState('');
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const handleSubmit = async () => {
    setIsSuccess(false); // Reset success state
    setErrorMessage(''); // Reset error message

    const movieData = {
      name,
      genre,
      plot,
      release_date: releaseDate,
      personal_rating: personalRating,
      notes,
      thumbnailURL
    };

    try {
      const response = await axios.post('http://localhost:3005/api/movies', movieData);

      if (response.data.id) {
        setIsSuccess(true); // Set the success state
        onMovieAdded(response.data); // Update the movie list in the parent component
        setTimeout(() => {
          // Reset form and success state after 3 seconds
          setName('');
          setGenre('');
          setPlot('');
          setReleaseDate('');
          setPersonalRating('');
          setNotes('');
          setThumbnailURL('');
          setIsSuccess(false);
          handleClose(); // Optionally close the modal
        }, 3000);
      } else {
        setErrorMessage('Failed to add the movie.');
      }
    } catch (error) {
      console.error("There was an error saving the movie data", error);
      setErrorMessage(`Error: ${error.message || "Unknown error occurred"}`);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Movie</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      { isSuccess && <div style={{color: 'green', marginBottom: '15px'}}>Movie added successfully!</div> }
        { errorMessage && <div style={{color: 'red', marginBottom: '15px'}}>{errorMessage}</div> }
        
        <Form.Control 
          type="text" 
          placeholder="Movie Name" 
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <br />
        <Form.Control 
          type="text" 
          placeholder="Genre" 
          value={genre}
          onChange={e => setGenre(e.target.value)}
        />
        <br />
        <Form.Control 
            as="textarea" 
            placeholder="Plot"
            rows={3} 
            value={plot} 
            onChange={e => setPlot(e.target.value)} 
          />
        <br />
        <Form.Control 
          type="date" 
          placeholder="Release Date" 
          value={releaseDate}
          onChange={e => setReleaseDate(e.target.value)}
        />
        <br />
        <br />
        <Form.Control 
          type="url" 
          placeholder="Movie Thumbnail" 
          value={thumbnailURL}
          onChange={e => setThumbnailURL(e.target.value)}
        />
        <br />
        <Form.Control 
            type="number" 
            placeholder="Personal Rating" 
            value={personalRating}
            onChange={e => {
                // Ensure entered value is within the desired range
                if (e.target.value >= 0 && e.target.value <= 5) {
                    setPersonalRating(e.target.value);
                }
            }}
            min="0"
            max="5"
            step="1" 
        />

        <br />
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Notes About Movie:</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            value={notes} 
            onChange={e => setNotes(e.target.value)} 
          />
        </Form.Group>
        {/* Note: The thumbnailURL input is a placeholder for now. Handling file uploads requires additional logic. */}
        <br />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddMovieModal;
