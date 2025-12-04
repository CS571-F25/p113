import React from 'react';
import SessionCard from './sessions/SessionCard';
import EmptyState from './sessions/EmptyState';

function MySessions({ sessions, currentUserName, onLeave, onDelete }) {
  const mySessions = sessions.filter(s => s.attendees.includes(currentUserName));

  if (!currentUserName) {
    return (
      <EmptyState 
        message="Please set your name in the header to see your sessions."
      />
    );
  }

  if (mySessions.length === 0) {
    return (
      <EmptyState 
        message="You haven't joined any sessions yet. Browse sessions to find one to join!"
        actionText="Browse Sessions"
        actionPath="/sessions"
      />
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
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default MySessions;