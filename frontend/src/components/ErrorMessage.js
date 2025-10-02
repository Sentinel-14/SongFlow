import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <Alert variant="danger" className="mb-0">
        <Alert.Heading>
          <i className="fas fa-exclamation-triangle me-2"></i>
          Oops! Something went wrong
        </Alert.Heading>
        <p className="mb-3">{message}</p>
        {onRetry && (
          <div>
            <button 
              className="btn btn-outline-danger"
              onClick={onRetry}
            >
              <i className="fas fa-redo me-1"></i>
              Try Again
            </button>
          </div>
        )}
      </Alert>
    </div>
  );
};

export default ErrorMessage;