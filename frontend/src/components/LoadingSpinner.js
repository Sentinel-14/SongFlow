import React from 'react';

const LoadingSpinner = ({ message = "Loading awesome snippets..." }) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <div className="text-white mt-3">
        <h5>{message}</h5>
        <p className="text-white-50">
          <i className="fas fa-music me-1"></i>
          Curating the perfect mood-based snippets for you
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;