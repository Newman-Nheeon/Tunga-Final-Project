import React from 'react';
import Button from 'react-bootstrap/Button';

const NavbarComponent = ({ handleShow }) => (
  <nav className="navbar navbar-dark" style={{ background: '#000', padding: '20px' }}>
    <div className="container">
      <ul className="nav navbar-nav navbar-right">
        <h3 style={{ fontSize: '24px', color: 'white' }}>Welcome User!!</h3>
      </ul>
      <div className='col-3'>
        <Button style={{ background: 'white', color: 'darkred', border: 'none' }} variant="primary" className='btn-small' onClick={handleShow}>
          Add Movie
        </Button>
      </div>
    </div>
  </nav>
);

export default NavbarComponent;
