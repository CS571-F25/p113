import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

function EmptyState({ message, actionText, actionPath }) {
  const navigate = useNavigate();

  return (
    <div className="alert alert-info d-flex flex-column align-items-center p-4">
      <p className="mb-3 text-center">{message}</p>
      {actionText && actionPath && (
        <Button 
          variant="primary" 
          onClick={() => navigate(actionPath)}
        >
          {actionText}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;