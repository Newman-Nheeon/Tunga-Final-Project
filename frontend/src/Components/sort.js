import React from 'react';
import Button from 'react-bootstrap/Button';

const SortArea = ({ onSort }) => {
  return (
    <div className='row m-0 pt-4 d-flex justify-content-center'>
      
      <div className='col-3'>
        <Button 
          style={{background: 'darkred', border: 'none'}}
          onClick={() => onSort('all')}
        >
          All
        </Button>
      </div>

      <div className='col-3'>
        <Button 
          style={{background: 'darkred', border: 'none'}}
          onClick={() => onSort('name')}
        >
          Name
        </Button>
      </div>

      <div className='col-3'>
        <Button 
          style={{background: 'darkred', border: 'none'}}
          onClick={() => onSort('rating')}
        >
          Rating
        </Button>
      </div>

      <div className='col-3'>
        <Button 
          style={{background: 'darkred', border: 'none'}}
          onClick={() => onSort('releaseDate')}
        >
          Release Date
        </Button>
      </div>

    </div>
  );
};

export default SortArea;
