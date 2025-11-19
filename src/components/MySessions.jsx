import React from 'react';
import SessionCard from './sessions/SessionCard';

function MySessions({ sessions, currentUserName, onLeave }) {
  const mySessions = sessions.filter(s => s.attendees.includes(currentUserName));

  if (!currentUserName) {
    return (
      <div className="alert alert-warning">
        Please set your name in the header to see your sessions.
      </div>
    );
  }

  if (mySessions.length === 0) {
    return (
      <div className="alert alert-info">
        You haven't joined any sessions yet. Browse sessions to find one to join!
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-4">My Study Sessions</h3>
      {mySessions.map(session => (
        <SessionCard
          key={session.id}
          session={session}
          currentUserName={currentUserName}
          onJoin={() => {}}
          onLeave={onLeave}
        />
      ))}
    </div>
  );
}

export default MySessions;