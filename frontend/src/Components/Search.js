import React from 'react';

const SearchArea = () => {
  return (
    <div id='search-area' className='row m-0 pt-5 d-flex justify-content-center'>
      <div className='col-9'>
        <div className="input-group">
          <input 
            type="search" 
            id="form1" 
            className="form-control" 
            placeholder='Search Movies...' 
          />
        </div>
      </div>
    </div>
  );
};

export default SearchArea;
