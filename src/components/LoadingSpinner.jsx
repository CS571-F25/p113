import React from 'react';
import { Spinner } from 'react-bootstrap';

function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        gap: '1rem'
      }}
    >
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading</span>
      </Spinner>
      <div>{message}</div>
    </div>
  );
}

export default LoadingSpinner;