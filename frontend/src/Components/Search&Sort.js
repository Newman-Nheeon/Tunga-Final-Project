import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchAndSortArea = ({ onSort }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/api/movies/search?name=${searchTerm}`);
      console.log("Searched movies data:", response.data); // Check the searched data
      onSort(response.data);
    } catch (error) {
      console.error("Error searching for movie:", error);
    }
  };
  

  const handleSort = async (criteria) => {
    try {
      const sortByMap = {
        name: 'name',
        rating: 'rating',
        releaseDate: 'release_date'
      };
  
      // Default to sorting by name if criteria is not recognized
      const sortValue = sortByMap[criteria] || 'name'; 
  
      if (criteria === "all") {
        // Fetch all movies without sorting
        const response = await axios.get('http://localhost:3005/api/movies');
        onSort(response.data);
      } else {
        const response = await axios.get(`http://localhost:3005/api/movies/sort?sortBy=${sortValue}`);
        onSort(response.data); 
      }
    } catch (error) {
      console.error(`Error sorting by ${criteria}:`, error);
    }
  };
  

  return (
    <div className='container'>
      <div className='row d-flex justify-content-between pt-5'>
        <div className='col-md-7 col-sm-12'>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text h-100" id="basic-addon1">
                <FontAwesomeIcon icon={faSearch} size='1x'></FontAwesomeIcon>
              </span>
            </div>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search Movie" 
              aria-label="Search" 
              aria-describedby="basic-addon1" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
        </div>
        <div className='col-md-5 col-sm-12'>
          <table id='table' className="table table-bordered table-white text-center">
            <thead>
              <tr>
                <th id='cols' scope="col" onClick={() => handleSort('all')}>All</th>
                <th id='cols' scope="col" onClick={() => handleSort('name')}>Name</th>
                <th id='cols' scope="col" onClick={() => handleSort('rating')}>Rating</th>
                <th id='cols' scope="col" onClick={() => handleSort('releaseDate')}>Releases</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchAndSortArea;
