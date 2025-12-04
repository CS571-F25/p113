import React from 'react';

function SessionCountBadge({ count }) {
  return (
    <span className="badge bg-secondary ms-2">
      {count} {count === 1 ? 'Session' : 'Sessions'}
    </span>
  );
}

export default SessionCountBadge;